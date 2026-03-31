import { create } from "zustand";
import type { Todo, TodoState } from "../types/todo";

interface TodoStore extends TodoState {
  loadTodos: (todos: Todo[]) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  undo: () => void;
  redo: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  history: [[]],
  future: [],

  loadTodos: (todos) =>
    set((state) => ({
      todos,
      history: [...state.history, [...todos]],
      future: [],
    })),

  addTodo: (text) =>
    set((state) => {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: Date.now(),
      };
      const newTodos = [...state.todos, newTodo];
      return {
        todos: newTodos,
        history: [...state.history, newTodos],
        future: [],
      };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      return {
        todos: newTodos,
        history: [...state.history, newTodos],
        future: [],
      };
    }),

  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((t) => t.id !== id);
      return {
        todos: newTodos,
        history: [...state.history, newTodos],
        future: [],
      };
    }),

  clearCompleted: () =>
    set((state) => {
      const newTodos = state.todos.filter((t) => !t.completed);
      return {
        todos: newTodos,
        history: [...state.history, newTodos],
        future: [],
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length <= 1) return state;
      const newHistory = [...state.history];
      const current = newHistory.pop()!;
      const previous = newHistory[newHistory.length - 1];
      return {
        todos: previous,
        history: newHistory,
        future: [current, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const newFuture = [...state.future];
      const next = newFuture.shift()!;
      return {
        todos: next,
        history: [...state.history, next],
        future: newFuture,
      };
    }),
}));