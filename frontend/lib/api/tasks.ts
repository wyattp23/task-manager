import { Task } from "@/app/types/task";
import { apiClient } from "./client";

export const tasksApi = {
  getTasks: async () => {
    const { data } = await apiClient.get<Task[]>("/tasks");
    return data;
  },

  getTask: async (id: number) => {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  createTask: async (input: Task) => {
    const { data } = await apiClient.post<Task>("/tasks", input);
    return data;
  },

  updateTask: async (id: number, input: Task) => {
    const { data } = await apiClient.put<Task>(`/tasks/${id}`, input);
    return data;
  },

  deleteTask: async (id: number) => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
