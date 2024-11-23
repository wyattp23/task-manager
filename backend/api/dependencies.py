from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
from .database import SessionLocal, get_db
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

load_dotenv()

SECRET_KEY = os.getenv("AUTH_SECRET_KEY", "")
ALGORITHM = os.getenv("AUTH_ALGORITHM", "HS256")
API_URL = os.getenv("API_URL", "http://localhost:8000")

if not SECRET_KEY:
    raise ValueError("AUTH_SECRET_KEY must be set in environment variables")


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")
oauth2_bearer_dependency = Annotated[str, Depends(oauth2_bearer)]
ph = PasswordHasher()


async def get_current_user(token: oauth2_bearer_dependency):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("email")
        user_id: int | None = payload.get("id")

        if email is None:
            raise credentials_exception
        
        return {"email": email, "id": user_id}
    except JWTError:
        raise credentials_exception
    
db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

def hash_password(password: str) -> str:
    return ph.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return ph.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False

