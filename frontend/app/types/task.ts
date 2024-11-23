export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
  updated_at: string;
}
