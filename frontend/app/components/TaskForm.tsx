"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TaskStatus } from "../types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskService } from "@/lib/services/tasks";

const statusDisplayMap: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.DONE]: "Done",
};

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  due_date: z
    .string()
    .transform((str) => (str === "" ? undefined : str))
    .optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO,
      due_date: undefined,
    },
  });

  async function onSubmit(data: TaskFormData) {
    try {
      await TaskService.createTask(data);
      reset();
      onTaskCreated();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter task title"
            />
            {errors.title && (
              <Alert variant="destructive">
                <AlertDescription>{errors.title.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={TaskStatus.TODO}
              onValueChange={(value) => {
                register("status").onChange({
                  target: { value, name: "status" },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusDisplayMap).map(([status, display]) => (
                  <SelectItem key={status} value={status}>
                    {display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input id="due_date" type="date" {...register("due_date")} />
            {errors.due_date && (
              <Alert variant="destructive">
                <AlertDescription>{errors.due_date.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
