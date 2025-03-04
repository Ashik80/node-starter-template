import { Response } from "express";
import { Todo } from "../../entities/todo";
import { TodoEditForm } from "../../form/todoEditForm";

export type TodoDetailsInfoOobData = {
  todo: Todo;
  form: TodoEditForm;
};

export function todoDetailsInfoOob(
  res: Response,
  status: number,
  data: TodoDetailsInfoOobData,
) {
  return res
    .status(status)
    .render("partials/todos/todo-details-info-oob", data);
}
