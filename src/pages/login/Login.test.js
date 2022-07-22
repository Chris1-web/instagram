import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

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
});
