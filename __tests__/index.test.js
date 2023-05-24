import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";

describe("Todo App", () => {
  it("renders the todo app", () => {
    render(<Home />);
    
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-todo")).toBeInTheDocument();
  });

  it("adds a todo", async () => {
    render(<Home />);
    
    const todoInput = screen.getByTestId("todo-input");
    const addTodoButton = screen.getByTestId("add-todo");
    const todoList = screen.getByTestId("todo-list");

    await act(async () => {
      fireEvent.change(todoInput, { target: { value: "New Todo" } });
      addTodoButton.click();
    });

    await waitFor(() => {
      expect(todoList).toHaveTextContent("New Todo");
    });
  });

  it("deletes a todo", async () => {
    render(<Home />);
  
    const todoInput = screen.getByTestId("todo-input");
    const addTodoButton = screen.getByTestId("add-todo");
  
    fireEvent.change(todoInput, { target: { value: "Todo 1" } });
    fireEvent.click(addTodoButton);
  
    const deleteTodoButton = screen.getByTestId("delete-todo-0");
    fireEvent.click(deleteTodoButton);
  
    const todoList = screen.getByTestId("todo-list");
    await waitFor(() => {
      expect(todoList).toBeEmptyDOMElement();
    });
  });
  
});
