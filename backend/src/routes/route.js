import express from "express";
import auth from "../middleware/auth.js";
import { register, login } from "../controllers/usersController.js";
import { createBoard, getBoard } from "../controllers/boardController.js";
import { createTask } from "../controllers/taskController.js";
import { createList } from "../controllers/listController.js";

const router = express.Router();

// Register & Login routes
router.post("/register", register);
router.post("/login", login);

// Board routes
router.post("/", auth, createBoard);
router.get("/", auth, getBoard);

// List routes
router.post("/:boardId/lists", auth, createList);

// Task routes
router.post("/:listId/tasks", auth, createTask);

export default router;
