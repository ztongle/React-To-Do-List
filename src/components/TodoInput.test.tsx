import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from "./TodoInput";

describe("TodoInput", () => {
  it("should render input and button", () => {
    render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);

    expect(screen.getByPlaceholderText("输入待办事项，按 Enter 添加...")).toBeTruthy();
    expect(screen.getByRole("button", { name: "添加" })).toBeTruthy();
  });

  it("should display the input value", () => {
    render(<TodoInput value="Test todo" onChange={() => {}} onAdd={() => {}} />);

    const input = screen.getByPlaceholderText("输入待办事项，按 Enter 添加...") as HTMLInputElement;
    expect(input.value).toBe("Test todo");
  });

  it("should call onChange when typing", () => {
    const onChange = vi.fn();
    render(<TodoInput value="" onChange={onChange} onAdd={() => {}} />);

    const input = screen.getByPlaceholderText("输入待办事项，按 Enter 添加...");
    fireEvent.change(input, { target: { value: "New todo" } });

    expect(onChange).toHaveBeenCalledWith("New todo");
  });

  it("should call onAdd when pressing Enter", () => {
    const onAdd = vi.fn();
    render(<TodoInput value="Test" onChange={() => {}} onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("输入待办事项，按 Enter 添加...");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onAdd).toHaveBeenCalled();
  });

  it("should call onAdd when clicking the button", () => {
    const onAdd = vi.fn();
    render(<TodoInput value="Test" onChange={() => {}} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "添加" }));

    expect(onAdd).toHaveBeenCalled();
  });

  it("should focus input after clicking add button", () => {
    const onAdd = vi.fn();
    render(<TodoInput value="Test" onChange={() => {}} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "添加" }));

    const input = screen.getByPlaceholderText("输入待办事项，按 Enter 添加...");
    expect(document.activeElement).toBe(input);
  });

  it("should not auto-focus on mount (focus only after add)", () => {
    render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);

    // Component does not auto-focus, it focuses only after onAdd is called
    const input = screen.getByPlaceholderText("输入待办事项，按 Enter 添加...");
    // In jsdom, body is the active element by default
    expect(document.activeElement).not.toBe(input);
  });
});
