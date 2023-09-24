const { User } = require('../models/user-model');
const {json} = require("express");

class UserService {
    async registration(email, password, deviceInfo) {
        return {email, password, deviceInfo};
    }
}

module.exports = new UserService();