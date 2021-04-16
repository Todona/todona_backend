const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const TodoList = db.todoList;

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const user = new User({
        _id: new db.mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return ;
        }

        const todoList = new TodoList({
            user: user._id,
        })

        res.send({ message: "User was registered successfully!"});

        todoList.save((err, todoList) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });
    });
}

exports.signin = (req, res) => {
    console.log(req.body.username);
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: 'User not Found!' });
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });

    });
}

exports.logout = async (req, res) => {
    console.log('Log Out');
    res.status(200).send({ message: "Log out" });
}