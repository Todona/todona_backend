const TaskModel = require('../models').task;
const services = require('../services');

exports.allTasks = services.getAllTasksService;

exports.getTaskById = services.getTaskService;

exports.createTask = services.createTaskService;

exports.updateTask = services.updateTaskService;

exports.deleteTask = services.deleteTaskService;

// async (req, res) => {
//     try {
//         await TaskModel.deleteOne({ _id: req.params.id });
//         res.status(204).send();
//     } catch {
//         res.status(404);
//         res.send({ error: "Task doesn't exist!" });
//     }
// };