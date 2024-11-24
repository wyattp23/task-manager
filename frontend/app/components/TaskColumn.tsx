import { Task, TaskStatus } from "../types/task";
import { TaskCard } from "./TaskCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  statusConfigs: Record<TaskStatus, { label: string; color: string }>;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskColumn({
  title,
  tasks,
  statusConfigs,
  onUpdateTask,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
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
