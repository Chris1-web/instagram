import Form from "./Form";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSubmit = jest.fn();

describe("render Form component", () => {
  test("should display inputs, button and footer", () => {
    render(
      <Form header="Instagram">
        <div className="email-container">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" />
        </div>
        <button>Submit Form</button>
        <footer>This is the form footer</footer>
      </Form>
    );
    const header = screen.getByRole("heading", { name: /Instagram/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", { name: /submit form/i });
    const footer = screen.getByText(/This is the form footer/i);
    expect(header).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test("should call submit function when form is submitted", () => {
    render(
      <Form header="Instagram" handleSubmit={mockSubmit}>
        <div className="email-container">
          <label htmlFor="email">Username or Email address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <footer>This is the form footer</footer>
      </Form>
    );
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
