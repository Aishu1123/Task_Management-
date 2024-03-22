const { sequelize } = require("../Config/db");
const { DataTypes } = require("sequelize");

const TaskModel = sequelize.define( 'task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = TaskModel;
