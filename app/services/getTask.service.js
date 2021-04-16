const db = require('../models');
const TaskModel = db.task;
const TodoList = db.todoList;

module.exports.getTaskService = async (req, res) => {
    await TodoList.findOne({
        user: req.userId
    })
        .populate('tasks', '-__v')
        .exec(async (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            const AllTasks = await user.tasks.map(task => task._id);
            
            for (let i = 0; i < AllTasks.length; i++) {
                if (AllTasks[i] == req.params.id) {
                    const task = await TaskModel.findOne({ _id: req.params.id });
                    return res.status(200).send(task);
                }
            }
            
            res.status(404);
            res.send({ error: "Task doesn't exist!" });
        })
};