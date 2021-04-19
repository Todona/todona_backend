const db = require('../models');
const TodoList = db.todoList;
const TaskModel = db.task;

module.exports.getAllTasksService = async (req, res) => {
    await TodoList.findOne({ user: req.userId })
        .populate('tasks', '-__v')
        .exec(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message:  "user Not Found." });
            }

            const isFinished = req.query.isFinished;
            const sortVar = { time: 1 };

            const sortTask = await TaskModel.find({
                _id: { $in: user.tasks },
                isFinished
            }).sort(sortVar);

            res.status(200).send(sortTask);

        });
}