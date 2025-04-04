import { Router, Request, Response } from "express";
import { ITodoService } from "../../application/services/todo_service";
import { templateRegistry } from "../../infrastructure/renderer/template_registry";
import { newTodoServiceWithInMemoryRepository } from "../../infrastructure/factories/todo_service";
import { getParamAsNumber } from "../../utils/conversion";
import { PageData } from "../../infrastructure/renderer/pagedata";
import { Todo } from "../../domain/entities/todo";
import assert from "assert";

type TodosPageData = PageData & {
  todos: Todo[];
  error: string;
  form: {
    title: string;
    description: string;
    error: string;
  };
};

type TodoPageData = PageData & {
  todo: Todo | null;
  error: string;
};

type TodoItemOobData = {
  todo: Todo | null;
  form: {
    title: string;
    description: string;
    error: string;
  };
};

type TodoDetailsInfoOobData = {
  todo: Todo | null;
  form: {
    id: string;
    title: string;
    description: string;
    error: string;
  };
};

export class TodoController {
  constructor(private readonly todoService: ITodoService) {}

  renderTodosPage = async (_: Request, res: Response) => {
    const pageData = templateRegistry.get("todos");
    assert(pageData, "Page data not set");
    const todoPageData: TodosPageData = {
      ...pageData,
      todos: [],
      error: "",
      form: {
        title: "",
        description: "",
        error: "",
      },
    };
    try {
      const result = await this.todoService.getTodos();
      todoPageData.todos = result.todos;
    } catch (error) {
      todoPageData.error =
        error instanceof Error ? error.message : "Something went wrong";
      return res.status(500).render("base", todoPageData);
    }

    return res.status(200).render("base", todoPageData);
  };

  renderTodoDetailsPage = async (req: Request, res: Response) => {
    const id = getParamAsNumber(req, "id");
    const pageData = templateRegistry.get("todo-details");
    assert(pageData, "Page data not set");

    const todoPageData: TodoPageData = {
      ...pageData,
      todo: null,
      error: "",
    };

    if (id === 0) {
      res.status(400).send("Invalid todo id");
      return;
    }

    try {
      const result = await this.todoService.getTodo({ id });
      todoPageData.todo = result.todo;
    } catch (error) {
      todoPageData.error =
        error instanceof Error ? error.message : "Something went wrong";
      return res.status(404).render("base", todoPageData);
    }

    return res.status(200).render("base", todoPageData);
  };

  createTodo = async (req: Request, res: Response) => {
    const data: TodoItemOobData = {
      form: {
        title: req.body.title,
        description: req.body.description,
        error: "",
      },
      todo: null,
    };

    try {
      const result = await this.todoService.addTodo({
        title: req.body.title,
        description: req.body.description,
      });
      data.todo = result.todo;
    } catch (error) {
      data.form.error =
        error instanceof Error ? error.message : "Something went wrong";
      return res
        .status(400)
        .render("partials/todos/todo-create-form", data.form);
    }

    data.form.title = "";
    data.form.description = "";

    return res.status(200).render("partials/todos/todo-item-oob", data);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = getParamAsNumber(req, "id");
    const todoEditFormData: TodoDetailsInfoOobData = {
      todo: null,
      form: {
        id: id.toString(),
        title: req.body.title,
        description: req.body.description,
        error: "",
      },
    };

    if (id === 0) {
      res.status(400).send("Invalid todo id");
      return;
    }

    try {
      const result = await this.todoService.updateTodo({
        id,
        title: todoEditFormData.form.title,
        description: todoEditFormData.form.description,
      });
      todoEditFormData.todo = result.todo;
    } catch (error) {
      todoEditFormData.form.error =
        error instanceof Error ? error.message : "Something went wrong";
      return res
        .status(400)
        .render("partials/todos/todo-edit-form", todoEditFormData.form);
    }

    todoEditFormData.form = {
      id: id.toString(),
      title: "",
      description: "",
      error: "",
    };

    res.appendHeader("Hx-Trigger", "close_edit_form");

    return res
      .status(200)
      .render("partials/todos/todo-details-info-oob", todoEditFormData);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = getParamAsNumber(req, "id");
    if (id === 0) {
      res.status(400).send("Invalid todo id");
      return;
    }
    try {
      await this.todoService.deleteTodo({ id });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      res
        .status(500)
        .send(
          `<div id="error-message" hx-swap-oob="true"><p class="text-red-400">${errorMessage}</p></div>`,
        );
      return;
    }

    res.setHeader("Hx-Location", "/todos");
    res.status(200).end();
  };
}

const todoController = new TodoController(
  newTodoServiceWithInMemoryRepository(),
);

const router = Router();
router.get("/", todoController.renderTodosPage);
router.get("/:id", todoController.renderTodoDetailsPage);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
