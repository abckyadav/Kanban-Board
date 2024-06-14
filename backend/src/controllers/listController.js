import Board from "../models/boardModel.js";
import List from "../models/listModel.js";
import Task from "../models/taskModel.js";

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

// Delete a list

export const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Delete all tasks associated with the list
    await Task.deleteMany({ list: req.params.listId });

    // Delete the list
    await List.findByIdAndDelete(req.params.listId);

    return res
      .status(200)
      .json({ message: "List and associated tasks deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
