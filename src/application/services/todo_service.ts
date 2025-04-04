import { Todo, TodoWithID } from "../../domain/entities/todo";
import { ITodoRepository } from "../../domain/repositories/todo_repository";
import {
  TodoCreateCommand,
  TodoCreateCommandResult,
  TodoDeleteCommand,
  TodoUpdateCommand,
  TodoUpdateCommandResult,
} from "../commands/todo_commands";
import {
  TodoListQueryResult,
  TodoQuery,
  TodoQueryResult,
} from "../queries/todo_queries";

export interface ITodoService {
  getTodos(): Promise<TodoListQueryResult>;
  getTodo(todoQuery: TodoQuery): Promise<TodoQueryResult>;
  addTodo(todoCommand: TodoCreateCommand): Promise<TodoCreateCommandResult>;
  deleteTodo(todoCommand: TodoDeleteCommand): Promise<void>;
  updateTodo(todoCommand: TodoUpdateCommand): Promise<TodoUpdateCommandResult>;
}

export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getTodos(): Promise<TodoListQueryResult> {
    return {
      todos: await this.todoRepository.list(),
    };
  }

  async getTodo(todoQuery: TodoQuery): Promise<TodoQueryResult> {
    return {
      todo: await this.todoRepository.get(todoQuery.id),
    };
  }

  async addTodo(
    todoCommand: TodoCreateCommand,
  ): Promise<TodoCreateCommandResult> {
    const todos = await this.todoRepository.list();
    const todo = new TodoWithID(
      todos.length + 1,
      todoCommand.title,
      todoCommand.description,
    );

    return {
      todo: await this.todoRepository.create(todo),
    };
  }

  async deleteTodo(todoCommand: TodoDeleteCommand): Promise<void> {
    return this.todoRepository.delete(todoCommand.id);
  }

  async updateTodo(
    todoCommand: TodoUpdateCommand,
  ): Promise<TodoUpdateCommandResult> {
    const todo = await this.todoRepository.get(todoCommand.id);
    const updatedTodo = new Todo(todoCommand.title, todoCommand.description);
    updatedTodo.setID(todo.id);

    return {
      todo: await this.todoRepository.update(updatedTodo),
    };
  }
}
