import { Response } from "express";
import { TodoEditForm } from "../../form/todoEditForm";

export function todoEditForm(
  res: Response,
  status: number,
  data: TodoEditForm,
) {
  return res.status(status).render("partials/todos/todo-edit-form", data);
}
