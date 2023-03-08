const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();
require("./db.js");

const app = express();

var corsOptions = {
  origin: [process.env.CORS_ORIGIN, process.env.CORS_DOMAIN],
  credentials: true,
};

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
