import Board from "../models/boardModel.js";

// Creatiing a new  Board
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
    const boards = await Board.find({ usere: req.user.id });
    return res.status(200).json({ message: "Success", boards: boards });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
