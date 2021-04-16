const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}]
    },
    {
        version: false
    }
);

module.exports = mongoose.model('TodoList', TodoListSchema);