import { Request, Response, Router } from "express";
import { todosPage, TodoListPageData } from "../templates/todos";
import { TodoService } from "../services/todos";
import { TodoCreateDto, TodoUpdateDto } from "../dtos/todos";
import { newTodoCreateForm } from "../form/todoCreateForm";
import { todoCreateForm } from "../templates/partials/todoCreateForm";
import {
  todoItemOob,
  TodoItemOobData,
} from "../templates/partials/todoItemOob";
import {
  todoDetailsPage,
  TodoDetailsPageData,
} from "../templates/todo-details";
import { newTodoEditForm } from "../form/todoEditForm";
import { todoEditForm } from "../templates/partials/todoEditForm";
import {
  todoDetailsInfoOob,
  TodoDetailsInfoOobData,
} from "../templates/partials/todoDetailsInfoOob";
import { Todo } from "../entities/todo";

export class TodosController {
  public readonly router = Router();

  constructor(private readonly todoService: TodoService) {
    this.router.get("/", this.todoListView.bind(this));
    this.router.post("/", this.createTodo.bind(this));
    this.router.get("/:id", this.todoDetailsView.bind(this));
    this.router.put("/:id", this.updateTodo.bind(this));
    this.router.delete("/:id", this.deleteTodo.bind(this));
  }

  todoListView(_: Request, res: Response) {
    const { todos, error } = this.todoService.getTodos();

    const pageData: TodoListPageData = {
      todos: [],
      form: newTodoCreateForm(),
      error: "",
    };

    if (error) {
      pageData.error = error.message;
      return todosPage(res, error.status, pageData);
    }

    pageData.todos = todos;
    pageData.form = newTodoCreateForm();

    return todosPage(res, 200, pageData);
  }

  createTodo(req: Request, res: Response) {
    const todoDto: TodoCreateDto = req.body;
    let createForm = newTodoCreateForm();
    createForm.title = todoDto.title;
    createForm.description = todoDto.description;

    const { todo, error } = this.todoService.addTodo(todoDto);
    if (error) {
      createForm.error = error.message;
      return todoCreateForm(res, error.status, createForm);
    }

    const todoOobData: TodoItemOobData = {
      todo: todo,
      form: newTodoCreateForm(),
    };
    return todoItemOob(res, 201, todoOobData);
  }

  todoDetailsView(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { todo, error } = this.todoService.getTodo(id);
    if (error) {
      return res.status(error.status).redirect("/todos");
    }

    const todoPageData: TodoDetailsPageData = {
      todo,
      error: "",
    };

    return todoDetailsPage(res, 200, todoPageData);
  }

  updateTodo(req: Request, res: Response) {
    const id = Number(req.params.id);
    const todoDto: TodoUpdateDto = req.body;
    const editForm = newTodoEditForm(
      new Todo(id, todoDto.title, todoDto.description),
    );

    const { todo, error } = this.todoService.updateTodo(id, todoDto);
    if (error) {
      editForm.error = error.message;
      return todoEditForm(res, error.status, editForm);
    }

    const todoOobData: TodoDetailsInfoOobData = {
      todo: todo,
      form: newTodoEditForm(todo),
    };

    res.set("Hx-Trigger", "close_edit_form");
    return todoDetailsInfoOob(res, 200, todoOobData);
  }

  deleteTodo(req: Request, res: Response) {
    const id = Number(req.params.id);
    const error = this.todoService.deleteTodo(id);
    if (error) {
      return res.status(error.status).redirect("/todos");
    }
    res.setHeader("Hx-Location", "/todos");
    res.status(200).end();
  }
}
