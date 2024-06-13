import List from "../models/listModel.js";
import Task from "../models/taskModel.js";

//Creating a Task
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const list = await List.findById(req.params.listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      list: req.params.listId,
    });
    console.log("newTask:", newTask);
    await newTask.save();

    list.tasks.push(newTask);
    await list.save();

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in createTask", error: error.message });
  }
};
