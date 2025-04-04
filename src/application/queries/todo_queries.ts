import { Todo } from "../../domain/entities/todo";

export type TodoListQueryResult = {
  todos: Todo[];
};

export type TodoQuery = {
  id: number;
};

export type TodoResult = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TodoQueryResult = {
  todo: Todo;
};
