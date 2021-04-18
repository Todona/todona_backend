const db = require('../models');
const TaskModel = db.task;
const TodoList = db.todoList;

module.exports.createTaskService = async (req, res) => {
    console.log(req.body)
    if (!req.body || req.body.task === "") {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    await TodoList.findOne({
        user: req.userId
    })
        .populate('tasks', '-__v')
        .exec(async (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const task = new TaskModel({
                ...req.body
            })

            await task.save(async (err, task) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                await user.tasks.push(task._id);
                await user.save();
            });
            return res.status(200).send(task);

        })
}