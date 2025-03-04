import { Todo } from "../entities/todo";

export type TodoEditForm = {
  id: number;
  title: string;
  description: string;
  error: string;
};

export function newTodoEditForm(todo: Todo): TodoEditForm {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    error: "",
  };
}
