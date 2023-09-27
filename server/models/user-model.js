const sequelize = require("../config/database");
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    firstname: DataTypes.STRING(255),
    secondname: DataTypes.STRING(255),
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    verificationCode: {
        type: DataTypes.STRING(6),
    },
});

module.exports = {User};
