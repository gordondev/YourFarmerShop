const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const {User} = require('./user-model');

const Session = sequelize.define('sessions', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    }, userId: {
        type: DataTypes.INTEGER, references: {
            model: User, key: 'id',
        },
    }, refreshToken: {
        type: DataTypes.STRING(900), allowNull: false,
    }, browserName: {
        type: DataTypes.STRING(255),
    }, browserVersion: {
        type: DataTypes.STRING(255),
    }, operatingSystemName: {
        type: DataTypes.STRING(255),
    }, operatingSystemVersion: {
        type: DataTypes.STRING(255),
    }, device: {
        type: DataTypes.STRING(255),
    },
});

module.exports = {Session};
