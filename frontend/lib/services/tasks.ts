import { Task } from "@/app/types/task";
import apiClient from "../api-client";

export const TaskService = {
  getAllTasks: async () => {
    const response = await apiClient.get<Task[]>("/tasks/");
    return response.data;
  },

  createTask: async (taskData: Partial<Task>) => {
    const response = await apiClient.post<Task>("/tasks/", taskData);
    return response.data;
  },

  updateTask: async (taskId: number, taskData: Partial<Task>) => {
    const response = await apiClient.put<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId: number) => {
    await apiClient.delete(`/tasks/${taskId}`);
  },
};
