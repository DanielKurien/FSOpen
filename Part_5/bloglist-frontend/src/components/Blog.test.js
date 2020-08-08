import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
test("renders content", () => {
  const blog = {
    title: "Yeet",
    author: "Kevin",
    url: "www.nba.com",
    likes: 100,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Yeet show");
});

test("clicking the button changes content", () => {
  const blog = {
    title: "yeet",
    author: "kobe",
    url: "nba",
    likes: 10,
  };

  const component = render(<Blog blog={blog} />);
  const button = component.getByText("show");

  fireEvent.click(button);

  expect(component.container).toHaveTextContent("yeet showyeetnbalikes 10kobe");
});
