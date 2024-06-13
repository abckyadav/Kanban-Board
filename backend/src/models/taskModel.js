import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
