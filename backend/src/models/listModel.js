import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const List = mongoose.model("List", ListSchema);

export default List;
