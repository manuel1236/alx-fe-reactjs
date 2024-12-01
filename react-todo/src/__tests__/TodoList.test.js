import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  it('renders the TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  it('displays initial todo items', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
  });

  it('allows a user to add a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a new todo/i);
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    fireEvent.click(screen.getByText('Add Todo'));

    expect(screen.getByText('Test new todo')).toBeInTheDocument();
  });

  it('allows a user to toggle a todo item', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    fireEvent.click(todoItem);

    // Update this line based on your toggle implementation
    expect(todoItem).toHaveClass('completed'); // Adjust if your toggle uses a specific class
  });

  it('allows a user to delete a todo item', () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});