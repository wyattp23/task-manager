import { Task, TaskStatus } from "../types/task";
import EditableField from "./EditableField";
import EditableDate from "./EditableDate";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  statusConfigs: Record<TaskStatus, { label: string; color: string }>;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskCard({
  task,
  statusConfigs,
  onUpdateTask,
  onDeleteTask,
}: TaskCardProps) {
  const handleUpdateField = (field: keyof Task, value: any) => {
    console.log(field, value);
    onUpdateTask({
      ...task,
      [field]: value,
    });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <EditableField
                value={task.title}
                onSave={(value) => handleUpdateField("title", value)}
                isTitle
                placeholder="Enter task title"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.values(TaskStatus).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => onUpdateTask(task.id, { ...task, status })}
                    disabled={task.status === status}
                  >
                    <span
                      className={`h-2 w-2 rounded-full mr-2 ${statusConfigs[status].color}`}
                    />
                    Move to {statusConfigs[status].label}
                  </DropdownMenuItem>
                ))}
                <Separator className="my-2" />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="min-h-[1.5rem] break-words whitespace-pre-wrap">
            <EditableField
              value={task.description || ""}
              onSave={(value) => handleUpdateField("description", value)}
              placeholder="Add description..."
            />
          </div>
          <div className="flex justify-end gap-4 text-xs">
            <EditableDate
              value={task.due_date}
              onSave={(value) => handleUpdateField("due_date", value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
