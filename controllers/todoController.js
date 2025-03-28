import { asyncErroHandlerMiddleware } from "../middlewares/asyncErrorHandlerMiddleware.js";
import { Todo } from "../models/todoModel.js";
import { APIQuery } from "../utils/apiQuery.js";
import { CustomError } from "../utils/customError.js";

const getAllTodos = asyncErroHandlerMiddleware(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  let todos = new APIQuery(Todo.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .select();

  todos = await todos.queryObject;
  const totalTodos = await Todo.countDocuments();
  const totalPages = Math.ceil(totalTodos / limit);

  res.status(200).render("index", {
    title: "Home",
    todos,
    totalTodos,
    totalPages,
    currentPage: page,
  });
});

const getTodo = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(
      new CustomError(404, "fail", "document not found with that id")
    );
  }
  res.status(200).render("todo", { title: "Todo", todo });
});

const createTodoPage = asyncErroHandlerMiddleware(async (req, res, next) => {
  res.status(200).render("createTodo", { title: "Create todo" });
});

const createTodo = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.create(req.body);
  req.flash("success", "Task created successfully!");
  res.redirect("/getAllTodos");
});

const markTodoAsCompleted = asyncErroHandlerMiddleware(
  async (req, res, next) => {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: true,
      },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return next(
        new CustomError(404, "fail", "document not found with that id")
      );
    }
    res.redirect(`/getTodo/${req.params.id}`);
  }
);

const markTodoAsPending = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      completed: false,
    },
    { new: true, runValidators: true }
  );
  if (!todo) {
    return next(
      new CustomError(404, "fail", "document not found with that id")
    );
  }
  res.redirect(`/getTodo/${req.params.id}`);
});

const deleteTodo = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return next(
      new CustomError(404, "fail", "document not found with that id")
    );
  }
  res.redirect("/getAllTodos");
});

const updateTodoPage = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(
      new CustomError(404, "fail", "document not found with that id")
    );
  }
  res.status(200).render("updateTodo", { title: "Update todo", todo });
});

const updateTodo = asyncErroHandlerMiddleware(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(
      new CustomError(404, "fail", "document not found with that id")
    );
  }
  res.redirect(`/getTodo/${req.params.id}`);
});

const todoController = {
  getAllTodos,
  getTodo,
  createTodoPage,
  createTodo,
  markTodoAsCompleted,
  markTodoAsPending,
  updateTodoPage,
  updateTodo,
  deleteTodo,
};

export { todoController };
