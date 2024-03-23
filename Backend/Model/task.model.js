const { sequelize } = require("../Config/db");
const { DataTypes } = require("sequelize");


const TaskModel = sequelize.define('task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userID: {
        type: DataTypes.INTEGER, 
        allowNull: true,
       
    }
});

module.exports = TaskModel;
