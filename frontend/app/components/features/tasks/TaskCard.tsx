import { Card, CardContent } from "@/app/components/ui/card";
import { TaskStatus } from "@/app/types/task";
import { Task } from "@/app/types/task";
import EditableField from "./EditableField";
import { TaskCardMenu } from "./TaskCardMenu";
import EditableDate from "./EditableDate";

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
  function handleUpdateField<K extends keyof Task>(field: K, value: Task[K]) {
    onUpdateTask({
      ...task,
      [field]: value,
    });
  }

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
            <TaskCardMenu
              task={task}
              statusConfigs={statusConfigs}
              onStatusChange={(status) => handleUpdateField("status", status)}
              onDelete={() => onDeleteTask(task.id)}
            />
          </div>
          <TaskDescription
            description={task.description}
            onUpdate={(value) => handleUpdateField("description", value)}
          />
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

function TaskDescription({
  description,
  onUpdate,
}: {
  description?: string;
  onUpdate: (value: string) => void;
}) {
  return (
    <div className="min-h-[1.5rem] break-words whitespace-pre-wrap">
      <EditableField
        value={description || ""}
        onSave={onUpdate}
        placeholder="Add description..."
      />
    </div>
  );
}
