from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, tasks


app = FastAPI()

Base.metadata.create_all(bind=engine)

# Wyatt - Revisit this to allow for multiple environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

app.include_router(auth.router)
app.include_router(tasks.router)