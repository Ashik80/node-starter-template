import { Todo } from "src/entities/todo";

export type TodoCreateDto = Omit<Todo, "id">;
export type TodoUpdateDto = Omit<Todo, "id">;
