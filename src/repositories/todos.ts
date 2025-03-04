import { newNotFoundError, TError } from "../error/error";
import { Todo } from "../entities/todo";
import { TodoRepository } from "./repository";

export class InMemoryTodoRepository implements TodoRepository {
  todos: Todo[] = [
    new Todo(1, "Todo 1", "Description 1"),
    new Todo(2, "Todo 2", "Description 2"),
  ];

  list(): { todos: Todo[]; error: TError | null } {
    return { todos: this.todos, error: null };
  }

  get(id: number): { todo: Todo; error: null } | { todo: null; error: TError } {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return { todo: null, error: newNotFoundError("Todo not found") };
    }
    return { todo, error: null };
  }

  create(
    todo: Todo,
  ): { todo: Todo; error: null } | { todo: null; error: TError } {
    this.todos.push(todo);
    return { todo, error: null };
  }

  delete(id: number): TError | null {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return null;
  }

  update(
    id: number,
    updatedTodo: Todo,
  ): { todo: Todo; error: null } | { todo: null; error: TError } {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return { todo: null, error: newNotFoundError("Todo not found") };
    }
    todo.title = updatedTodo.title;
    todo.description = updatedTodo.description;
    todo.createdAt = updatedTodo.updatedAt;
    return { todo, error: null };
  }
}
