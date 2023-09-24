const {User} = require('../models/user-model');
const {generateUniqueValue} = require('../utils/generateUniqueValue');
const argon2Utils = require('../utils/argon2Utils');

class UserService {
    async isUsernameUnique(username) {
        const existingUser = await User.findOne({where: {username}});
        return !existingUser;
    }

    async generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    async generateUniqueUsername() {
        const randomString = await this.generateRandomString(10);
        const username = `User-${randomString}`;

        const isUnique = await this.isUsernameUnique(username);
        if (!isUnique) {
            return this.generateUniqueUsername();
        }

        return username;
    }

    async hashPassword(password, salt) {
        return await argon2Utils.hashPassword(password, salt);
    }

    async registration(email, password, deviceInfo) {
        const salt = await generateUniqueValue();
        const hashedPassword = await this.hashPassword(password, salt);
        const username = await this.generateUniqueUsername();
        return {user: {username, email, password: hashedPassword}, deviceInfo};
    }
}

module.exports = new UserService();