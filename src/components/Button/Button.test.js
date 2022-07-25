import Button from "./Button";
import { render, screen } from "@testing-library/react";

describe("render button component", () => {
  test("should render button as disabled", () => {
    render(<Button disabled={true} title="Welcome" />);
    const button = screen.getByRole("button", { name: /welcome/i });
    expect(button).toBeDisabled();
  });
  test("should render button as not disabled", () => {
    render(<Button disabled={false} title="submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).not.toBeDisabled();
  });
});
