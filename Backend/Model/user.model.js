const { sequelize } = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = sequelize.define( 'User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },

});

module.exports = UserModel;
