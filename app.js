import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import flash from "connect-flash";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { todoRouter } from "./routes/todoRoutes.js";
import { CustomError } from "./utils/customError.js";
import { globalErrorHandlerMiddleware } from "./middlewares/globalErrorHandlerMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// BODY PARSER - READING DATA FROM REQUEST BODY
app.use(express.json());

// ✅ THIS IS FOR FORM SUBMISSION FROM EJS TEMPLATES
app.use(express.urlencoded({ extended: true }));

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware for sessions (Required for flash messages)
app.use(
  session({
    secret: "secretKey123", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 1000 }, // Set expiration time for session
  })
);

// Use flash messages
app.use(flash());

// Make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

// SET EJS AS THE VIEW ENGINE
app.set("view engine", "ejs");

// SET THE DIRECTORY FOR EJS TEMPLATES (VIEWS)
app.set("views", path.join(__dirname, "views"));

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// ROUTES MIDDLEWARE
app.use("/", todoRouter);

// NOT FOUND MIDDLEWARE
app.all("*", (req, res, next) => {
  next(new CustomError("404", "fail", "resource not found!!!"));
});

// GLOBAL ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandlerMiddleware);

export { app };
