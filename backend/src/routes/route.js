import express from "express";
import auth from "../middleware/auth.js";
import { register, login } from "../controllers/usersController.js";
import {
  createBoard,
  deleteBoard,
  getBoard,
} from "../controllers/boardController.js";
import { createTask } from "../controllers/taskController.js";
import { createList, deleteList } from "../controllers/listController.js";
import { dragAndDropController } from "../controllers/dragAndDropController.js";

const router = express.Router();

// Register & Login routes
router.post("/register", register);
router.post("/login", login);

// Board routes
router.post("/", auth, createBoard);
router.get("/", auth, getBoard);
router.delete("/:boardId", auth, deleteBoard); // Delete a board

// List routes
router.post("/:boardId/lists", auth, createList);
router.delete("/:listId/lists", auth, deleteList); // Delete a list

// Task routes
router.post("/:listId/tasks", auth, createTask);

//move cards drag and drop
router.post("/cards/move", auth, dragAndDropController);

export default router;
