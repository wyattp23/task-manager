"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";
import TaskBoard from "./components/TaskBoard";
import { Task } from "./types/task";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";
import { TaskService } from "@/lib/services/tasks";
import useAuthContext from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

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

  // Only show loading spinner during initial auth check
  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ProtectedRoute>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Task
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
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

        <TaskBoard
          tasks={tasks}
          onUpdateTask={async (updatedTask) => {
            try {
              await TaskService.updateTask(updatedTask.id, updatedTask);
              await fetchTasks();
            } catch (error) {
              console.error("Error updating task:", error);
              setError("Failed to update task");
            }
          }}
          onDeleteTask={async (taskId) => {
            try {
              await TaskService.deleteTask(taskId);
              await fetchTasks();
            } catch (error) {
              console.error("Error deleting task:", error);
              setError("Failed to delete task");
            }
          }}
        />
      </main>
    </ProtectedRoute>
  );
}
