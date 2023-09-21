const { User } = require('../models/user-model');
const {json} = require("express");

class UserService {
    async registration() {
        return "<<WORKED>>";
    }
}

module.exports = new UserService();