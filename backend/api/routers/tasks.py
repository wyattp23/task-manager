from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List
from ..models import Task, TaskStatus
from ..dependencies import db_dependency, user_dependency

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: TaskStatus
    due_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_task(
    task_create: TaskCreate,
    db: db_dependency,
    current_user: user_dependency
):
    """
    Create a new task.
    
    Parameters:
        task_create: Task data
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Task: Created task object
    """
    db_task = Task(
        user_id=current_user["id"],
        title=task_create.title,
        description=task_create.description,
        status=task_create.status,
        due_date=task_create.due_date
    )
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task 

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    db: db_dependency,
    current_user: user_dependency
):
    """
    Get all tasks for the authenticated user.
    
    Parameters:
        db: Database session
        current_user: Authenticated user
        
    Returns:
        List[Task]: List of tasks
    """
    tasks = db.query(Task).filter(
        Task.user_id == current_user["id"]
    ).order_by(Task.created_at.desc()).all()
    
    return tasks

@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
async def delete_task(
    task_id: int,
    db: db_dependency,
    current_user: user_dependency
):
    """
    Delete a task by ID for the authenticated user.
    
    Parameters:
        task_id: Task ID
        db: Database session
        current_user: Authenticated user
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.put("/{task_id}", status_code=status.HTTP_200_OK)
async def update_task(
    task_id: int,
    task_update: TaskCreate,
    db: db_dependency,
    current_user: user_dependency
):
    """
    Update a task by ID for the authenticated user.
    
    Parameters:
        task_id: Task ID
        task_update: Task data
        db: Database session
        current_user: Authenticated user
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    task.title = task_update.title
    task.description = task_update.description
    task.status = task_update.status
    task.due_date = task_update.due_date

    db.commit()
    db.refresh(task)
    return task
