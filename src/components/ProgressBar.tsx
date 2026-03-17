import React from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  if (total === 0) return null;

  const percent = (completed / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>完成进度</span>
        <span>{completed} / {total}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
