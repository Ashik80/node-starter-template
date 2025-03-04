export class Todo {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
