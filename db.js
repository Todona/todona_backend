const db = require('./app/models');
const mongoose = db.mongoose;

mongoose
  .connect(db.url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("📚 Database connected ");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});