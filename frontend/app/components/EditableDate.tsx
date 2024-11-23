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

  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 16);
  };

  const [editedValue, setEditedValue] = useState(formatDateForInput(value));

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const handleSave = () => {
    if (!editedValue) {
      onSave(null);
    } else {
      const date = new Date(editedValue);
      if (isNaN(date.getTime())) {
        setEditedValue(formatDateForInput(value));
      } else {
        onSave(date.toISOString());
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedValue(formatDateForInput(value));
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        type="date"
        value={editedValue.split("T")[0]}
        onChange={(e) => {
          if (e.target.value) {
            setEditedValue(`${e.target.value}T12:00`);
          } else {
            setEditedValue("");
          }
        }}
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
