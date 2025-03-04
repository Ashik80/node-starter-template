import express from "express";
import { HomeController } from "./controllers/home";
import { TodosController } from "./controllers/todos";
import { TodoServiceImpl } from "./services/todos";
import { InMemoryTodoRepository } from "./repositories/todos";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("static"));

const homeController = new HomeController();
app.use("/", homeController.router);

const todoRepository = new InMemoryTodoRepository();
const todosService = new TodoServiceImpl(todoRepository);
const todosController = new TodosController(todosService);
app.use("/todos", todosController.router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
