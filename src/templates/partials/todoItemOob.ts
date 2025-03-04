import { Response } from "express";
import { Todo } from "src/entities/todo";
import { TodoCreateForm } from "src/form/todoCreateForm";

export type TodoItemOobData = {
  todo: Todo;
  form: TodoCreateForm;
};

export function todoItemOob(
  res: Response,
  status: number,
  data: TodoItemOobData,
) {
  return res.status(status).render("partials/todos/todo-item-oob", data);
}
