import { Response } from "express";
import { TodoCreateForm } from "../../form/todoCreateForm";

export function todoCreateForm(
  res: Response,
  status: number,
  data: TodoCreateForm,
) {
  return res.status(status).render("partials/todos/todo-create-form", data);
}
