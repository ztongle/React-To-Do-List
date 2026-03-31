import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("should render nothing when total is 0", () => {
    const { container } = render(<ProgressBar completed={0} total={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render progress bar when total > 0", () => {
    render(<ProgressBar completed={2} total={5} />);
    expect(screen.getByText("完成进度")).toBeTruthy();
    expect(screen.getByText("2 / 5")).toBeTruthy();
  });

  it("should display correct count text", () => {
    render(<ProgressBar completed={3} total={10} />);
    expect(screen.getByText("3 / 10")).toBeTruthy();
  });
});