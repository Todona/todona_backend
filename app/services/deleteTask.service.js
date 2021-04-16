const db = require('../models');
const TaskModel = db.task;
const TodoList = db.todoList;

module.exports.deleteTaskService = async (req, res) => {
    await TodoList.findOne({
        user: req.userId
    })
        .populate('tasks', '-__v')
        .exec(async (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            if (!user) {
                return res.status(404).send({ message: 'User Not Found' });
            }

            const AllTasks = await user.tasks.map(task => task._id);
            
            for (let i = 0; i < AllTasks.length; i++) {
                if (AllTasks[i] == req.params.id) {
                    await TaskModel.deleteOne(
                        { _id: req.params.id }
                    );

                    user.tasks.remove(req.params.id);
                    user.save();

                    return res.status(204).send();
                }
            }
            
            res.status(404);
            res.send({ error: "Task doesn't exist!" });

        })
};