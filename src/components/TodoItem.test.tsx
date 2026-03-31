import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./ToDoItem";
import type { Todo } from "../types/todo";

const mockTodo: Todo = {
  id: 1,
  text: "Test todo",
  completed: false,
  createdAt: Date.now(),
};

describe("TodoItem", () => {
  it("should render todo text", () => {
    const todos = [mockTodo];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Test todo")).toBeTruthy();
  });

  it("should render checkbox unchecked for incomplete todo", () => {
    const todos = [{ ...mockTodo, completed: false }];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("should render checkbox checked for completed todo", () => {
    const todos = [{ ...mockTodo, completed: true }];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should call onToggle when clicking checkbox", () => {
    const onToggle = vi.fn();
    const todos = [mockTodo];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={onToggle}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("should call onDelete when clicking delete button", () => {
    const onDelete = vi.fn();
    const todos = [mockTodo];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={vi.fn()}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByTitle("删除"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("should show completed styling for completed todo", () => {
    const todos = [{ ...mockTodo, completed: true }];
    render(
      <TodoItem
        index={0}
        todos={todos}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const text = screen.getByText("Test todo");
    expect(text.className).toContain("line-through");
  });
});
