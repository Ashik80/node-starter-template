import { Response } from "express";
import { Todo } from "src/entities/todo";

export function todoItem(res: Response, status: number, data: Todo) {
  return res.status(status).render("partials/todos/todo-item", data);
}
