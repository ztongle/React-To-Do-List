import React, { useState, startTransition, Suspense } from "react";
import { useImmerReducer } from "use-immer";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ProgressBar from "./ProgressBar";
import FilterButtons from "./FilterButtons";
import ActionButtons from "./ActionButtons";
import { todoReducer } from "../reducer/todoReducer";
import { initialState } from "../types/todo";
import type { FilterType, Todo } from "../types/todo";
import ToDoList from "./ToDoList";

const ToDoContainer: React.FC = () => {
  const [state, dispatch] = useImmerReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = () => {
    const trimmedText = inputText.trim();
    if (trimmedText) {
      dispatch({ type: "ADD", text: trimmedText });
      setInputText("");
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE", id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE", id });
  };

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const handleFilterChange = (newFilter: FilterType) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  };

  const filteredTodos = state.todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = state.todos.filter((t: Todo) => t.completed).length;
  const totalCount = state.todos.length;

  const canUndo = state.history.length > 1;
  const canRedo = state.future.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <TodoHeader />

          <div className="p-6">
            <TodoInput
              value={inputText}
              onChange={setInputText}
              onAdd={addTodo}
            />

            <ProgressBar completed={completedCount} total={totalCount} />

            <FilterButtons filter={filter} onChange={handleFilterChange} />

            <ul className="space-y-3 mb-6 h-[calc(100vh-562px)]">
              <Suspense
                fallback={<div className="text-white text-2xl">加载中...</div>}
              >
                <ToDoList
                  filter={filter}
                  filteredTodos={filteredTodos}
                  dispatch={dispatch}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              </Suspense>
            </ul>

            <ActionButtons
              canUndo={canUndo}
              canRedo={canRedo}
              completedCount={completedCount}
              onUndo={() => dispatch({ type: "UNDO" })}
              onRedo={() => dispatch({ type: "REDO" })}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-6">
          提示：使用键盘 Enter 快速添加任务
        </p>
      </div>
    </div>
  );
};

export default ToDoContainer;
