import { Todo } from "../../domain/entities/todo";

export type TodoCreateCommand = {
  title: string;
  description: string;
};

export type TodoCreateCommandResult = {
  todo: Todo;
};

export type TodoDeleteCommand = {
  id: number;
};

export type TodoUpdateCommand = {
  id: number;
  title: string;
  description: string;
};

export type TodoUpdateCommandResult = {
  todo: Todo;
};
