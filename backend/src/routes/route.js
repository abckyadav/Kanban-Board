import express from "express";
import auth from "../middleware/auth.js";
import { register, login } from "../controllers/usersController.js";
import {
  createBoard,
  deleteBoard,
  getBoard,
} from "../controllers/boardController.js";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import {
  createList,
  deleteList,
  updateList,
} from "../controllers/listController.js";
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
router.put("/:listId/lists", auth, updateList);
router.delete("/:listId/lists", auth, deleteList);

// Task routes
router.post("/:listId/tasks", auth, createTask);
router.put("/:taskId/tasks", auth, updateTask);
router.delete("/:taskId/tasks", auth, deleteTask);
//move cards drag and drop
router.post("/cards/move", auth, dragAndDropController);

export default router;
