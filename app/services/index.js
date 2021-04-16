const { createTaskService } = require('./createTask.service');
const { getAllTasksService } = require('./getAllTasks.service');
const { getTaskService } = require('./getTask.service');
const { updateTaskService } = require('./updateTask.service');
const { deleteTaskService } = require('./deleteTask.service');

module.exports = {
    createTaskService,
    getAllTasksService,
    getTaskService,
    updateTaskService,
    deleteTaskService,
}