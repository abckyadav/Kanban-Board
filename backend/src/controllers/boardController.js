import Board from "../models/boardModel.js";
import List from "../models/listModel.js";
import Task from "../models/taskModel.js";

// Creating a new  Board
export const createBoard = async (req, res) => {
  const { name } = req.body;

  try {
    const newBoard = new Board({ name, user: req.user.id });
    await newBoard.save();
    return res
      .status(200)
      .json({ message: "Board created successfully", board: newBoard });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Getting a new  Board
export const getBoard = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id }).populate({
      path: "lists",
      populate: {
        path: "tasks",
      },
    });
    return res.status(200).json({ message: "Success", boards: boards });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete a Board
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Delete all lists associated with the board
    const lists = await List.find({ board: req.params.boardId });

    for (const list of lists) {
      // Delete all tasks associated with the list
      await Task.deleteMany({ list: list._id });
    }

    await List.deleteMany({ board: req.params.boardId });

    // Delete the board
    await Board.findByIdAndDelete(req.params.boardId);

    return res.status(200).json({
      message: "Board and associated lists and tasks deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
