import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from api.database import Base
from api.main import app
from api.dependencies import get_db
import os

SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@db:5432/taskmanager"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def test_db():
    Base.metadata.drop_all(bind=engine)  # Clear existing tables
    Base.metadata.create_all(bind=engine)
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client(test_db):
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()

@pytest.fixture
def test_user(client):
    user_data = {
        "email": "test@example.com",
        "password": "test123",
        "name": "Test User"
    }
    response = client.post("/auth/", json=user_data)
    assert response.status_code == 201
    return user_data

@pytest.fixture
def auth_headers(client, test_user):
    login_data = {
        "username": test_user["email"],
        "password": test_user["password"]
    }
    response = client.post("/auth/token", data=login_data)
    assert response.status_code == 200
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def pytest_configure(config):
    config.addinivalue_line(
        "markers",
        "asyncio: mark test as an async test"
    )