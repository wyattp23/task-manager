"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, Pencil } from "lucide-react";

interface EditableDateProps {
  value?: string | null;
  onSave: (value: string | null) => void;
}

export default function EditableDate({ value, onSave }: EditableDateProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value || "");

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const handleSave = () => {
    onSave(editedValue || null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedValue(value || "");
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        type="datetime-local"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-6 px-1 py-0 text-xs"
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="group flex items-center gap-1 cursor-pointer"
    >
      <Calendar className="h-3 w-3 text-gray-500" />
      <span
        className={`text-xs ${
          !value ? "text-gray-400 italic" : "text-gray-500"
        } group-hover:text-gray-700`}
      >
        {value ? `Due: ${formatDate(value)}` : "No due date"}
      </span>
      <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  );
}
