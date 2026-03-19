import type { Draft } from "immer";
import type { TodoState, TodoAction } from "../types/todo";

export function todoReducer(draft: Draft<TodoState>, action: TodoAction): void {
  switch (action.type) {
    case "LOAD":
      draft.todos = action.todos;
      draft.history.push([...draft.todos]);
      draft.future = [];
      break;
    case "ADD":
      draft.todos.push({
        id: Date.now(),
        text: action.text,
        completed: false,
        createdAt: Date.now(),
      });
      draft.history.push([...draft.todos]);
      draft.future = [];
      break;
    case "TOGGLE": {
      const todo = draft.todos.find((t) => t.id === action.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      draft.history.push([...draft.todos]);
      draft.future = [];
      break;
    }
    case "DELETE":
      draft.todos = draft.todos.filter((t) => t.id !== action.id);
      draft.history.push([...draft.todos]);
      draft.future = [];
      break;
    case "CLEAR_COMPLETED":
      draft.todos = draft.todos.filter((t) => !t.completed);
      draft.history.push([...draft.todos]);
      draft.future = [];
      break;
    case "UNDO":
      if (draft.history.length > 1) {
        const current = draft.history.pop()!;
        draft.future.push(current);
        draft.todos = [...draft.history[draft.history.length - 1]];
      }
      break;
    case "REDO":
      if (draft.future.length > 0) {
        const nextState = draft.future.pop()!;
        draft.todos = nextState;
        draft.history.push([...nextState]);
      }
      break;
  }
}
