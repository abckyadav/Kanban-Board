import Board from "../models/boardModel.js";
import List from "../models/listModel.js";

//Creating a new List
export const createList = async (req, res) => {
  const { name } = req.body;

  try {
    const board = await Board.findById(req.params.boardId);

    if (!board) {
      return res.status(500).json({ message: "Board not found" });
    }

    const newList = new List({
      name,
      board: req.params.boardId,
    });
    console.log("newList:", newList);
    await newList.save();

    board.lists.push(newList);
    await board.save();

    return res
      .status(201)
      .json({ message: "List created successfully", list: newList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in createList", error: error.message });
  }
};
