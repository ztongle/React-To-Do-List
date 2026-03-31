import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionButtons from "./ActionButtons";

describe("ActionButtons", () => {
  it("should render undo and redo buttons", () => {
    render(
      <ActionButtons
        canUndo={true}
        canRedo={true}
        completedCount={0}
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onClearCompleted={vi.fn()}
      />
    );
    expect(screen.getByText("撤销")).toBeTruthy();
    expect(screen.getByText("重做")).toBeTruthy();
  });

  it("should call onUndo when clicking undo button", () => {
    const onUndo = vi.fn();
    render(
      <ActionButtons
        canUndo={true}
        canRedo={false}
        completedCount={0}
        onUndo={onUndo}
        onRedo={vi.fn()}
        onClearCompleted={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText("撤销"));
    expect(onUndo).toHaveBeenCalled();
  });

  it("should call onRedo when clicking redo button", () => {
    const onRedo = vi.fn();
    render(
      <ActionButtons
        canUndo={false}
        canRedo={true}
        completedCount={0}
        onUndo={vi.fn()}
        onRedo={onRedo}
        onClearCompleted={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText("重做"));
    expect(onRedo).toHaveBeenCalled();
  });

  it("should disable undo button when canUndo is false", () => {
    const onUndo = vi.fn();
    render(
      <ActionButtons
        canUndo={false}
        canRedo={true}
        completedCount={0}
        onUndo={onUndo}
        onRedo={vi.fn()}
        onClearCompleted={vi.fn()}
      />
    );

    const undoBtn = screen.getByText("撤销").closest("button") as HTMLButtonElement;
    expect(undoBtn.disabled).toBe(true);
  });

  it("should disable redo button when canRedo is false", () => {
    const onRedo = vi.fn();
    render(
      <ActionButtons
        canUndo={true}
        canRedo={false}
        completedCount={0}
        onUndo={vi.fn()}
        onRedo={onRedo}
        onClearCompleted={vi.fn()}
      />
    );

    const redoBtn = screen.getByText("重做").closest("button") as HTMLButtonElement;
    expect(redoBtn.disabled).toBe(true);
  });

  it("should not render clear button when completedCount is 0", () => {
    render(
      <ActionButtons
        canUndo={true}
        canRedo={true}
        completedCount={0}
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onClearCompleted={vi.fn()}
      />
    );

    expect(screen.queryByText(/清除已完成/)).toBeNull();
  });

  it("should render clear button when completedCount > 0", () => {
    render(
      <ActionButtons
        canUndo={true}
        canRedo={true}
        completedCount={3}
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onClearCompleted={vi.fn()}
      />
    );

    expect(screen.getByText("清除已完成 (3)")).toBeTruthy();
  });

  it("should call onClearCompleted when clicking clear button", () => {
    const onClearCompleted = vi.fn();
    render(
      <ActionButtons
        canUndo={true}
        canRedo={true}
        completedCount={2}
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onClearCompleted={onClearCompleted}
      />
    );

    fireEvent.click(screen.getByText("清除已完成 (2)"));
    expect(onClearCompleted).toHaveBeenCalled();
  });
});