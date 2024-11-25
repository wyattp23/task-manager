import { Button } from "@/app/components/ui/button";
import { PlusCircle, LogOut, XCircle } from "lucide-react";

interface TaskHeaderActionsProps {
  isFormOpen: boolean;
  onToggleForm: () => void;
  onLogout: () => void;
}

export default function TaskHeaderActions({
  isFormOpen,
  onToggleForm,
  onLogout,
}: TaskHeaderActionsProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={onToggleForm} className="gap-2">
        {isFormOpen ? (
          <>
            <XCircle className="h-4 w-4" />
            Close
          </>
        ) : (
          <>
            <PlusCircle className="h-4 w-4" />
            Add Task
          </>
        )}
      </Button>
      <Button variant="outline" onClick={onLogout} className="gap-2">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
