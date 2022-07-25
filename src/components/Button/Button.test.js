import Button from "./Button";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("render button component", () => {
  test("should render button as disabled", () => {
    render(
      <MemoryRouter>
        <Button disabled={true} title="Welcome" />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /welcome/i });
    expect(button).toBeDisabled();
  });
  test("should render button as not disabled", () => {
    render(
      <MemoryRouter>
        <Button disabled={false} title="submit" />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).not.toBeDisabled();
  });
});
