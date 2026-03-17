import React from "react";

interface ActionButtonsProps {
  canUndo: boolean;
  canRedo: boolean;
  completedCount: number;
  onUndo: () => void;
  onRedo: () => void;
  onClearCompleted: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  canUndo,
  canRedo,
  completedCount,
  onUndo,
  onRedo,
  onClearCompleted,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="撤销 (Ctrl+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          撤销
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="重做 (Ctrl+Y)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
          重做
        </button>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          清除已完成 ({completedCount})
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
