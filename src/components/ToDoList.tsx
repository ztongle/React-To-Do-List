import React, {
  useReducer,
  useCallback,
  useState,
  startTransition,
} from "react";
import ToDoItem from "./ToDoItem";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import ProgressBar from "./ProgressBar";
import FilterButtons from "./FilterButtons";
import ActionButtons from "./ActionButtons";
import { todoReducer } from "../reducer/todoReducer";
import { initialState } from "../types/todo";
import type { FilterType, Todo } from "../types/todo";

const ToDoList: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = useCallback(() => {
    const trimmedText = inputText.trim();
    if (trimmedText) {
      dispatch({ type: "ADD", text: trimmedText });
      setInputText("");
    }
  }, [inputText]);

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "CLEAR_COMPLETED" });
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  }, []);

  const filteredTodos = state.todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = state.todos.filter((t: Todo) => t.completed).length;
  const totalCount = state.todos.length;

  const canUndo = state.history.length > 1;
  const canRedo = state.future.length > 0;

  const getEmptyMessage = () => {
    switch (filter) {
      case "active":
        return "没有未完成的事项";
      case "completed":
        return "没有已完成的事项";
      default:
        return "暂无待办事项";
    }
  };

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

            <ul className="space-y-3 mb-6">
              {filteredTodos.length === 0 ? (
                <li className="text-center py-8 text-gray-400 dark:text-gray-500">
                  {getEmptyMessage()}
                </li>
              ) : (
                filteredTodos.map((todo: Todo) => (
                  <ToDoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
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

export default ToDoList;
