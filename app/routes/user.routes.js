const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/tasks", 
        [ authJwt.verifyToken ],
        controller.allTasks
    );

    app.get(
        "/api/tasks/:id",
        [ authJwt.verifyToken ],
        controller.getTaskById
    )

    app.post(
        "/api/tasks",
        [ authJwt.verifyToken ],
        controller.createTask
    )

    app.put(
        "/api/tasks/:id",
        [ authJwt.verifyToken ],
        controller.updateTask
    )

    app.delete(
        "/api/tasks/:id",
        [ authJwt.verifyToken ],
        controller.deleteTask
    )

};