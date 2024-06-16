import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["normal", "urgent"], default: "normal" },
    completed: { type: Boolean, default: false },
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
