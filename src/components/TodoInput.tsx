import React, { useRef } from "react";
import type { KeyboardEvent } from "react";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  const handleAdd = () => {
    onAdd();
    inputRef.current?.focus();
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入待办事项，按 Enter 添加..."
        className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <button
        onClick={handleAdd}
        disabled={!value.trim()}
        className="px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        添加
      </button>
    </div>
  );
};

export default TodoInput;
