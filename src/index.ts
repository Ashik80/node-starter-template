import express from "express";
import homeController from "./interfaces/controllers/home_controller";
import todoController from "./interfaces/controllers/todo_controller";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("static"));

// Controllers
app.use("/", homeController);
app.use("/todos", todoController);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
