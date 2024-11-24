import { Task, TaskStatus } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  function getStatusColor(status: TaskStatus) {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-yellow-100 text-yellow-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case TaskStatus.DONE:
        return "bg-green-100 text-green-800";
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          {task.description && (
            <p className="mt-2 text-gray-600">{task.description}</p>
          )}
          <div className="mt-2 text-sm text-gray-500">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks yet</p>
      )}
    </div>
  );
}
