const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { sequelize } = require('./Config/db');
const { taskRouter } = require('./Route/task.route');
const TaskModel = require('./Model/task.model');
const UserModel = require('./Model/user.model');
const { userRouter } = require('./Route/user.route');

const app = express();


app.use(express.json());
app.use(cors());



app.use('/task', taskRouter);
app.use('/user',userRouter);

app.get("/", (req, res) => {
    res.status(200).json("Welcome to Task-Management Application");
});

sequelize.sync()
  .then(() => {
    console.log('Database connection has been established successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
