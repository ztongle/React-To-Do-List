import React from "react";
import type { FilterType } from "../types/todo";

interface FilterButtonsProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, onChange }) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "全部" },
    { value: "active", label: "未完成" },
    { value: "completed", label: "已完成" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === f.value
              ? "bg-purple-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
