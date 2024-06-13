import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

const Board = mongoose.model("Board", BoardSchema);

export default Board;
