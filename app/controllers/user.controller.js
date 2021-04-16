const services = require('../services');

exports.allTasks = services.getAllTasksService;

exports.getTaskById = services.getTaskService;

exports.createTask = services.createTaskService;

exports.updateTask = services.updateTaskService;

exports.deleteTask = services.deleteTaskService;