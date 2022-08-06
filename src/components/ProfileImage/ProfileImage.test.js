import ProfileImage from "./ProfileImage";
import { render, screen } from "@testing-library/react";
import user from "../../image/user.png";
import { MemoryRouter } from "react-router-dom";

describe("render profileImage component", () => {
  test("should render link", () => {
    render(
      <MemoryRouter>
        <ProfileImage link="/profile" altText="person" picture={user} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/profile");
  });
  test("should render image", () => {
    render(
      <MemoryRouter>
        <ProfileImage link="/" altText="person" picture={user} />
      </MemoryRouter>
    );
    const image = screen.getByAltText("person");
    expect(image).toBeInTheDocument();
  });
});
