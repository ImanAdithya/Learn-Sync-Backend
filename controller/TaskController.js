const Task = require('../model/Task');
const mongoose = require('mongoose');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  console.log("THIS IS GET ALL TASKS");
  
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tasks for user
exports.getTasksByUserId = async (req, res) => {
  try {    
    const tasks = await Task.find({ userId: req.params.userId }); // Find all tasks for the given userId

    if (!tasks.length) {  // Check if the array is empty
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Task by TaskId
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      { taskId: req.params.taskId },
      req.body,
      { new: true }  // This returns the updated task
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updating task:", error);
    res.status(500).json({ error: error.message });
  }
};


// Delete Task by TaskId
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ taskId: req.params.taskId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
