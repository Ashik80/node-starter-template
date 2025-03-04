import { TodoRepository } from "../repositories/repository";
import { Todo } from "../entities/todo";
import { TodoCreateDto, TodoUpdateDto } from "../dtos/todos";
import { TError } from "src/error/error";

export interface TodoService {
  getTodos(): { todos: Todo[]; error: TError | null };
  getTodo(
    id: number,
  ): { todo: Todo; error: null } | { todo: null; error: TError };
  addTodo(
    todoDto: TodoCreateDto,
  ): { todo: Todo; error: null } | { todo: null; error: TError };
  deleteTodo(id: number): TError | null;
  updateTodo(
    id: number,
    todoDto: TodoUpdateDto,
  ): { todo: Todo; error: null } | { todo: null; error: TError };
}

export class TodoServiceImpl implements TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos() {
    return this.todoRepository.list();
  }

  getTodo(id: number) {
    return this.todoRepository.get(id);
  }

  addTodo(todoDto: TodoCreateDto) {
    const { todos, error } = this.getTodos();
    if (error) {
      return { todo: null, error };
    }
    const todo = new Todo(todos.length + 1, todoDto.title, todoDto.description);
    return this.todoRepository.create(todo);
  }

  deleteTodo(id: number) {
    return this.todoRepository.delete(id);
  }

  updateTodo(id: number, todoDto: TodoUpdateDto) {
    const todo = new Todo(id, todoDto.title, todoDto.description);
    const { todo: updatedTodo, error } = this.todoRepository.update(id, todo);
    if (error) {
      return { todo: null, error };
    }
    return { todo: updatedTodo!, error: null };
  }
}
