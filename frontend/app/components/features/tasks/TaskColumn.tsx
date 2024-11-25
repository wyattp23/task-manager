import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Task, TaskStatus } from "@/app/types/task";
import { TaskCard } from "./TaskCard";

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

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskColumn({
  status,
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg font-semibold">
          {statusConfigs[status].label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto flex-1 min-h-0">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            statusConfigs={statusConfigs}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No tasks yet</p>
        )}
      </CardContent>
    </Card>
  );
}
