from datetime import datetime, timedelta, timezone
import pytest
from api.models import TaskStatus

@pytest.mark.asyncio
async def test_create_task(client, auth_headers):
    task_data = {
        "title": "Test Task",
        "description": "Test Description",
        "status": TaskStatus.TODO,
        "due_date": (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()
    }
    
    response = client.post("/tasks/", json=task_data, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == task_data["title"]
    assert data["description"] == task_data["description"]
    assert data["status"] == task_data["status"]

@pytest.mark.asyncio
async def test_get_tasks(client, auth_headers):
    task_data1 = {"title": "Task 1", "status": TaskStatus.TODO}
    task_data2 = {"title": "Task 2", "status": TaskStatus.IN_PROGRESS}
    
    client.post("/tasks/", json=task_data1, headers=auth_headers)
    client.post("/tasks/", json=task_data2, headers=auth_headers)
    
    response = client.get("/tasks/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Task 2"  # Most recent first
    assert data[1]["title"] == "Task 1"

@pytest.mark.asyncio
async def test_delete_task(client, auth_headers):
    task_data = {"title": "Task to Delete", "status": TaskStatus.TODO}
    create_response = client.post("/tasks/", json=task_data, headers=auth_headers)
    task_id = create_response.json()["id"]
    
    delete_response = client.delete(f"/tasks/{task_id}", headers=auth_headers)
    assert delete_response.status_code == 200
    
    get_response = client.get("/tasks/", headers=auth_headers)
    assert len(get_response.json()) == 0

@pytest.mark.asyncio
async def test_delete_nonexistent_task(client, auth_headers):
    response = client.delete("/tasks/999", headers=auth_headers)
    assert response.status_code == 404

@pytest.mark.asyncio
async def test_create_task_unauthorized(client):
    task_data = {"title": "Test Task", "status": TaskStatus.TODO}
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_get_tasks_unauthorized(client):
    response = client.get("/tasks/")
    assert response.status_code == 401 