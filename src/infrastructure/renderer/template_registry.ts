import { PageData } from "./pagedata";

export const templateRegistry: Map<string, PageData> = new Map<
  string,
  PageData
>();

templateRegistry.set("home", new PageData("home", "Home", "/"));
templateRegistry.set("todos", new PageData("todos", "Todos", "/todos"));
templateRegistry.set("todo-details", new PageData("todo-details", "", ""));
