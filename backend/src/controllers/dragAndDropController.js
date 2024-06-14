// dragAndDropController.js
import Board from "../models/boardModel.js";
import List from "../models/listModel.js";

export const dragAndDropController = async (req, res) => {
  const { cardId, sourceBoardId, targetBoardId } = req.body;

  try {
    const sourceBoard = await Board.findById(sourceBoardId);
    const targetBoard = await Board.findById(targetBoardId);
    const card = await List.findById(cardId);

    if (!sourceBoard || !targetBoard || !card) {
      return res.status(404).json({ message: "Board or Card not found" });
    }

    sourceBoard.cards.pull(cardId);
    await sourceBoard.save();

    targetBoard.cards.push(cardId);
    await targetBoard.save();

    res.status(200).json({ message: "Card moved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
