import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  isTitle?: boolean;
  placeholder?: string;
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  isTitle?: boolean;
  placeholder?: string;
}

export default function EditableField({
  value,
  onSave,
  isTitle = false,
  placeholder,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    if (editedValue.trim() !== value) {
      onSave(editedValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={isTitle ? "font-medium" : "text-sm text-gray-500"}
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`group cursor-pointer flex items-start gap-2 w-full ${
        isTitle ? "font-medium" : "text-sm text-gray-500"
      }`}
    >
      <div className="flex-1 break-words whitespace-pre-wrap w-full">
        {value ? (
          <span>{value}</span>
        ) : (
          <span className="text-gray-400 italic">{placeholder}</span>
        )}
      </div>
      <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
    </div>
  );
}
