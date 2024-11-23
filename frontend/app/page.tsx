"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";
import TaskBoard from "./components/TaskBoard";
import { Task } from "./types/task";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchTasks();
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchTasks();
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Button onClick={() => setIsFormOpen(!isFormOpen)} className="gap-2">
            <PlusCircle className="h-5 w-5" />
            {isFormOpen ? "Close" : "New Task"}
          </Button>
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
