"use client";

import { Task, TaskStatus } from "../types/task";
import { TaskColumn } from "./TaskColumn";

const statusConfigs = {
  [TaskStatus.TODO]: {
    label: "To Do",
    color: "bg-yellow-500",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "In Progress",
    color: "bg-blue-500",
  },
  [TaskStatus.DONE]: {
    label: "Done",
    color: "bg-green-500",
  },
} as const;

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function TaskBoard({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.values(TaskStatus).map((status) => (
        <TaskColumn
          key={status}
          title={statusConfigs[status].label}
          tasks={tasks.filter((task) => task.status === status)}
          statusConfigs={statusConfigs}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
