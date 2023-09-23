const { User } = require('../models/user-model');
const {json} = require("express");

class UserService {
    async registration(email, password) {
        return `EMAIL = ${email} PASSW = ${password}`;
    }
}

module.exports = new UserService();