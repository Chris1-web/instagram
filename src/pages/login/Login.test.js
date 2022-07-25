import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("renders login pages", () => {
  test("should have email and password input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailAddress = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    expect(emailAddress).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test("should have correct value of input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    userEvent.type(emailInput, "c@gmail.com");
    expect(emailInput.value).toBe("c@gmail.com");
  });
});
