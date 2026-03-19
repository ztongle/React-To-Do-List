import { use, useEffect } from "react";
import { List } from "react-window";
import type { FilterType, Todo, TodoAction } from "../types/todo";
import ToDoItem from "./ToDoItem";
interface ToDoListProps {
  filteredTodos: Todo[];
  filter: FilterType;
  dispatch: React.Dispatch<TodoAction>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

let promise: Promise<Todo[]>;
function fetchTodos() {
  return (
    promise ||
    (promise = new Promise((resolve, reject) => {
      fetch("/mockdata.json")
        .then((res) => setTimeout(() => resolve(res.json()), 2000))
        .catch(() => reject([]));
    }))
  );
}

export default function ToDoList({
  filteredTodos = [],
  toggleTodo,
  deleteTodo,
  filter,
  dispatch,
}: ToDoListProps) {
  const data = use(fetchTodos());

  useEffect(() => {
    dispatch({ type: "LOAD", todos: data });
  }, [data, dispatch]);

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
    <>
      {filteredTodos.length == 0 ? (
        <li className="text-center py-8 text-gray-400 dark:text-gray-500">
          {getEmptyMessage()}
        </li>
      ) : (
        <List
          rowCount={filteredTodos.length}
          rowComponent={(props) => <ToDoItem {...props} />}
          rowHeight={78}
          rowProps={{
            todos: filteredTodos,
            onToggle: toggleTodo,
            onDelete: deleteTodo,
          }}
        />
      )}
    </>
  );
}
