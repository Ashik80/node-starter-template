import { DateTime } from "../valueobjects/datetime";

export class Todo {
  id: number;
  title: string;
  description: string;
  createdAt: DateTime;
  updatedAt: DateTime;

  constructor(title: string, description: string) {
    if (!title) {
      throw new Error("Title is required");
    }

    const time = DateTime.now();

    this.title = title;
    this.description = description;
    this.createdAt = time;
    this.updatedAt = time;
  }

  setID(id: number) {
    if (id === 0) {
      throw new Error("Id is invalid");
    }
    this.id = id;
    this.updatedAt = DateTime.now();
  }

  setTitle(title: string) {
    if (!title) {
      throw new Error("Title is required");
    }

    this.title = title;
    this.updatedAt = DateTime.now();
  }

  setDescription(description: string) {
    this.description = description;
    this.updatedAt = DateTime.now();
  }
}

export class TodoWithID extends Todo {
  constructor(id: number, title: string, description: string) {
    super(title, description);
    this.setID(id);
  }
}
