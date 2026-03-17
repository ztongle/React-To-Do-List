export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = "all" | "active" | "completed";

export type TodoAction =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "CLEAR_COMPLETED" }
  | { type: "UNDO" }
  | { type: "REDO" };

export interface TodoState {
  todos: Todo[];
  history: Todo[][];
  future: Todo[][];
}

export const initialState: TodoState = {
  todos: [],
  history: [[]],
  future: [],
};
