import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterButtons from "./FilterButtons";

describe("FilterButtons", () => {
  it("should render all filter buttons", () => {
    render(<FilterButtons filter="all" onChange={() => {}} />);
    expect(screen.getByText("全部")).toBeTruthy();
    expect(screen.getByText("未完成")).toBeTruthy();
    expect(screen.getByText("已完成")).toBeTruthy();
  });

  it("should call onChange with 'all' when clicking 全部", () => {
    const onChange = vi.fn();
    render(<FilterButtons filter="active" onChange={onChange} />);

    fireEvent.click(screen.getByText("全部"));
    expect(onChange).toHaveBeenCalledWith("all");
  });

  it("should call onChange with 'active' when clicking 未完成", () => {
    const onChange = vi.fn();
    render(<FilterButtons filter="all" onChange={onChange} />);

    fireEvent.click(screen.getByText("未完成"));
    expect(onChange).toHaveBeenCalledWith("active");
  });

  it("should call onChange with 'completed' when clicking 已完成", () => {
    const onChange = vi.fn();
    render(<FilterButtons filter="all" onChange={onChange} />);

    fireEvent.click(screen.getByText("已完成"));
    expect(onChange).toHaveBeenCalledWith("completed");
  });
});