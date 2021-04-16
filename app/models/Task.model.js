const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: String,
    time: String,
    isFinished: { type: Boolean, default: false },
  },
  {
    version: false
  }
);

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
