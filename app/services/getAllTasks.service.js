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
            const task = req.query.task ? { $regex: req.query.task, $options: "i" } : { $regex: "", $options: "i" };
            const sortVar = { time: 1 };

            console.log(task);

            const sortTask = await TaskModel.find({
                task,
                _id: { $in: user.tasks },
                isFinished
            }).sort(sortVar);

            console.log(sortTask);

            return res.status(200).send(sortTask);

        });
}