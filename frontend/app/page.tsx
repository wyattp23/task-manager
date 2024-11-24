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

export default function Home() {
  const { logout } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function fetchTasks() {
    try {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks");
    }
  }

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              {isFormOpen ? "Close" : "New Task"}
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>

        <div
          className={`
          transition-all duration-300 ease-in-out
          ${
            isFormOpen
              ? "max-h-[1000px] opacity-100 mb-8"
              : "max-h-0 opacity-0 overflow-hidden"
          }
        `}
        >
          <TaskForm
            onTaskCreated={() => {
              fetchTasks();
              setIsFormOpen(false);
            }}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
            {error}
          </div>
        )}

        <TaskBoard
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </ProtectedRoute>
  );
}
