import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreVertical } from "lucide-react";
import { Task, TaskStatus } from "../types/task";

interface TaskCardMenuProps {
  task: Task;
  statusConfigs: Record<TaskStatus, { label: string; color: string }>;
  onStatusChange: (status: TaskStatus) => void;
  onDelete: () => void;
}

export function TaskCardMenu({
  task,
  statusConfigs,
  onStatusChange,
  onDelete,
}: TaskCardMenuProps) {
  return (
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
            onClick={() => onStatusChange(status)}
            disabled={task.status === status}
          >
            <StatusBadge color={statusConfigs[status].color} />
            Move to {statusConfigs[status].label}
          </DropdownMenuItem>
        ))}
        <Separator className="my-2" />
        <DropdownMenuItem className="text-red-600" onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StatusBadge({ color }: { color: string }) {
  return <span className={`h-2 w-2 rounded-full mr-2 ${color}`} />;
}
