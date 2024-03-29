const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function(app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        verifySignUp.checkDuplicateUsernameOrEmail,
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.get("/api/auth/logout", controller.logout);
}
