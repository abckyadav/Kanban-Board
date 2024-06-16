import List from "../models/listModel.js";
import Task from "../models/taskModel.js";

//Creating a Task
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;

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
      completed,
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

// Update a task
export const updateTask = async (req, res) => {
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.taskId);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
