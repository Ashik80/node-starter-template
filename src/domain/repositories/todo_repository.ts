import { Todo } from "../entities/todo";

export interface ITodoRepository {
  list(): Promise<Todo[]>;
  get(id: number): Promise<Todo>;
  create(todo: Todo): Promise<Todo>;
  delete(id: number): Promise<void>;
  update(updatedTodo: Todo): Promise<Todo>;
}
