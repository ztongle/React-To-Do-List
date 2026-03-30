import { describe, it, expect } from "vitest";
import { todoReducer } from "./todoReducer";
import { initialState } from "../types/todo";

describe("todoReducer", () => {
  describe("ADD", () => {
    it("should add a new todo", () => {
      const state = { ...initialState };
      todoReducer(state, { type: "ADD", text: "Buy milk" });

      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe("Buy milk");
      expect(state.todos[0].completed).toBe(false);
    });

    it("should push current state to history", () => {
      const state = { ...initialState };
      todoReducer(state, { type: "ADD", text: "Test" });

      expect(state.history.length).toBeGreaterThan(1);
      expect(state.future).toHaveLength(0);
    });
  });

  describe("TOGGLE", () => {
    it("should toggle todo completed status", () => {
      const state = {
        ...initialState,
        todos: [{ id: 1, text: "Test", completed: false, createdAt: Date.now() }],
        history: [[{ id: 1, text: "Test", completed: false, createdAt: Date.now() }]],
      };

      todoReducer(state, { type: "TOGGLE", id: 1 });

      expect(state.todos[0].completed).toBe(true);
    });

    it("should clear future on new action", () => {
      const state = {
        ...initialState,
        todos: [{ id: 1, text: "Test", completed: false, createdAt: Date.now() }],
        history: [[{ id: 1, text: "Test", completed: false, createdAt: Date.now() }]],
        future: [[{ id: 1, text: "Test", completed: true, createdAt: Date.now() }]],
      };

      todoReducer(state, { type: "TOGGLE", id: 1 });

      expect(state.future).toHaveLength(0);
    });
  });

  describe("DELETE", () => {
    it("should remove todo by id", () => {
      const state = {
        ...initialState,
        todos: [
          { id: 1, text: "First", completed: false, createdAt: Date.now() },
          { id: 2, text: "Second", completed: false, createdAt: Date.now() },
        ],
        history: [[
          { id: 1, text: "First", completed: false, createdAt: Date.now() },
          { id: 2, text: "Second", completed: false, createdAt: Date.now() },
        ]],
      };

      todoReducer(state, { type: "DELETE", id: 1 });

      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].id).toBe(2);
    });
  });

  describe("CLEAR_COMPLETED", () => {
    it("should remove all completed todos", () => {
      const state = {
        ...initialState,
        todos: [
          { id: 1, text: "Active", completed: false, createdAt: Date.now() },
          { id: 2, text: "Done", completed: true, createdAt: Date.now() },
        ],
        history: [[
          { id: 1, text: "Active", completed: false, createdAt: Date.now() },
          { id: 2, text: "Done", completed: true, createdAt: Date.now() },
        ]],
      };

      todoReducer(state, { type: "CLEAR_COMPLETED" });

      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe("Active");
    });
  });

  describe("UNDO", () => {
    it("should restore previous state", () => {
      const previousTodos = [{ id: 1, text: "Previous", completed: false, createdAt: Date.now() }];
      const state = {
        todos: [{ id: 2, text: "Current", completed: false, createdAt: Date.now() }],
        history: [previousTodos, [{ id: 2, text: "Current", completed: false, createdAt: Date.now() }]],
        future: [],
      };

      todoReducer(state, { type: "UNDO" });

      expect(state.todos).toEqual(previousTodos);
      expect(state.future).toHaveLength(1);
    });

    it("should not undo when history has only one entry", () => {
      const singleTodo = [{ id: 1, text: "Only", completed: false, createdAt: Date.now() }];
      const state = {
        todos: singleTodo,
        history: [singleTodo],
        future: [],
      };

      todoReducer(state, { type: "UNDO" });

      expect(state.todos).toEqual(singleTodo);
      expect(state.future).toHaveLength(0);
    });
  });

  describe("REDO", () => {
    it("should restore next state from future", () => {
      const futureTodos = [{ id: 2, text: "Future", completed: false, createdAt: Date.now() }];
      const state = {
        todos: [{ id: 1, text: "Current", completed: false, createdAt: Date.now() }],
        history: [[{ id: 1, text: "Current", completed: false, createdAt: Date.now() }]],
        future: [futureTodos],
      };

      todoReducer(state, { type: "REDO" });

      expect(state.todos).toEqual(futureTodos);
      expect(state.future).toHaveLength(0);
      expect(state.history).toHaveLength(2);
    });

    it("should not redo when future is empty", () => {
      const currentTodo = [{ id: 1, text: "Current", completed: false, createdAt: Date.now() }];
      const state = {
        todos: currentTodo,
        history: [currentTodo],
        future: [],
      };

      todoReducer(state, { type: "REDO" });

      expect(state.todos).toEqual(currentTodo);
    });
  });

  describe("LOAD", () => {
    it("should load todos and reset history/future", () => {
      const loadedTodos = [
        { id: 1, text: "Loaded", completed: false, createdAt: Date.now() },
      ];
      const state = {
        todos: [{ id: 99, text: "Old", completed: true, createdAt: Date.now() }],
        history: [[{ id: 99, text: "Old", completed: true, createdAt: Date.now() }]],
        future: [[{ id: 99, text: "Old", completed: true, createdAt: Date.now() }]],
      };

      todoReducer(state, { type: "LOAD", todos: loadedTodos });

      expect(state.todos).toEqual(loadedTodos);
      expect(state.history).toHaveLength(2);
      expect(state.future).toHaveLength(0);
    });
  });
});
