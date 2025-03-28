import express from "express";
import { todoController } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/getAllTodos", todoController.getAllTodos);
todoRouter.get("/getTodo/:id", todoController.getTodo);
todoRouter.get("/createTodo", todoController.createTodoPage);
todoRouter.post("/createTodo", todoController.createTodo);
todoRouter.post("/markTodoAsCompleted/:id", todoController.markTodoAsCompleted);
todoRouter.post("/markTodoAsPending/:id", todoController.markTodoAsPending);
todoRouter.get("/updateTodo/:id", todoController.updateTodoPage);
todoRouter.post("/updateTodo/:id", todoController.updateTodo);
todoRouter.get("/deleteTodo/:id", todoController.deleteTodo);

export { todoRouter };
