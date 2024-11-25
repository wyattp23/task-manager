"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import TaskForm from "./components/features/tasks/TaskForm";
import TaskBoard from "./components/features/tasks/TaskBoard";
import { Task } from "./types/task";
import { TaskService } from "@/lib/services/tasks";
import useAuthContext from "./context/AuthContext";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import TaskHeaderActions from "./components/features/tasks/TaskHeaderActions";

export default function Home() {
  const { logout, isLoading: isAuthLoading, user } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function fetchTasks() {
    setIsLoadingTasks(true);
    try {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks");
    } finally {
      setIsLoadingTasks(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  async function handleUpdateTask(updatedTask: Task) {
    try {
      await TaskService.updateTask(updatedTask.id, updatedTask);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  }

  async function handleDeleteTask(taskId: number) {
    try {
      await TaskService.deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  }

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ProtectedRoute>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <TaskHeaderActions
            isFormOpen={isFormOpen}
            onToggleForm={() => setIsFormOpen(!isFormOpen)}
            onLogout={logout}
          />
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        {isFormOpen && (
          <div className="mb-8">
            <TaskForm
              onTaskCreated={() => {
                setIsFormOpen(false);
                fetchTasks();
              }}
            />
          </div>
        )}

        {isLoadingTasks ? (
          <LoadingSpinner />
        ) : (
          <TaskBoard
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </ProtectedRoute>
  );
}
