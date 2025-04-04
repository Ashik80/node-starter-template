import { Todo, TodoWithID } from "../../../domain/entities/todo";
import { ITodoRepository } from "../../../domain/repositories/todo_repository";

export class InMemoryTodoRepository implements ITodoRepository {
  todos: Todo[] = [
    new TodoWithID(1, "Todo 1", "Description 1"),
    new TodoWithID(2, "Todo 2", "Description 2"),
  ];

  list(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  get(id: number): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return Promise.reject(new Error("Todo not found"));
    }
    return Promise.resolve(todo);
  }

  create(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return Promise.resolve(todo);
  }

  delete(id: number): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return Promise.resolve();
  }

  update(updatedTodo: Todo): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === updatedTodo.id);
    if (!todo) {
      return Promise.reject(new Error("Todo not found"));
    }
    todo.title = updatedTodo.title;
    todo.description = updatedTodo.description;
    todo.updatedAt = updatedTodo.updatedAt;
    return Promise.resolve(todo);
  }
}
