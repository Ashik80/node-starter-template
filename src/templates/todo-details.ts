import { Response } from "express";
import { PageData } from "./templates";
import { Todo } from "src/entities/todo";

export type TodoDetailsPageData = Partial<PageData> & {
  todo: Todo;
  error: string;
};

export function todoDetailsPage(
  res: Response,
  status: number,
  data: TodoDetailsPageData,
) {
  data.title = data.todo.title;
  data.page = "todo-details";
  data.path = "/todos" + data.todo.id;
  data.layout = "main";
  return res.status(status).render("base", data);
}
