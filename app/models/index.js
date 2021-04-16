const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require('./User.model');
db.task = require('./Task.model');
db.todoList = require('./TodoList.model');

module.exports = db;