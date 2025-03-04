import { Response } from "express";
import { Todo } from "../entities/todo";
import { PageData } from "./templates";
import { TodoCreateForm } from "src/form/todoCreateForm";

export type TodoListPageData = Partial<PageData> & {
  todos: Todo[];
  form: TodoCreateForm;
  error: string;
};

export function todosPage(
  res: Response,
  statusCode: number,
  data: TodoListPageData,
) {
  data.title = "Todos";
  data.page = "todos";
  data.path = "/todos";
  data.layout = "main";
  res.status(statusCode).render("base", data);
}
