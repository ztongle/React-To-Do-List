import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { List } from "react-window";
import type { FilterType, Todo } from "../types/todo";
import { useTodoStore } from "../store/todoStore";
import ToDoItem from "./ToDoItem";
interface ToDoListProps {
  filteredTodos: Todo[];
  filter: FilterType;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("/mockdata.json");
  return res.json();
}

export default function ToDoList({
  filteredTodos = [],
  toggleTodo,
  deleteTodo,
  filter,
}: ToDoListProps) {
  const loadTodos = useTodoStore((state) => state.loadTodos);

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      loadTodos(data);
    }
  }, [data, loadTodos]);

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
