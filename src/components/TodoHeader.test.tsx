import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoHeader from "./TodoHeader";

describe("TodoHeader", () => {
  it("should render the title", () => {
    render(<TodoHeader />);
    expect(screen.getByText("Todo List")).toBeTruthy();
  });

  it("should render the subtitle", () => {
    render(<TodoHeader />);
    expect(screen.getByText("支持撤销 / 重做功能")).toBeTruthy();
  });
});