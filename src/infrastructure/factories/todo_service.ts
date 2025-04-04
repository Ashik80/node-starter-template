import { TodoService } from "../../application/services/todo_service";
import { InMemoryTodoRepository } from "../db/memory/todo_repository";

export const newTodoServiceWithInMemoryRepository = () => {
  const todoRepository = new InMemoryTodoRepository();
  const todoService = new TodoService(todoRepository);
  return todoService;
};
