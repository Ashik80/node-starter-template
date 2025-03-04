import { Todo } from "../entities/todo";
import { TError } from "../error/error";

export interface TodoRepository {
  list(): { todos: Todo[]; error: TError | null };
  get(id: number): { todo: Todo; error: null } | { todo: null; error: TError };
  create(
    todo: Todo,
  ): { todo: Todo; error: null } | { todo: null; error: TError };
  delete(id: number): TError | null;
  update(
    id: number,
    updatedTodo: Todo,
  ): { todo: Todo; error: null } | { todo: null; error: TError };
}
