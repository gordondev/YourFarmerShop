const {User} = require('../models/user-model');
const {generateUniqueValue} = require('../utils/generateUniqueValue');
const argon2Utils = require('../utils/argon2Utils');
const UserDto = require("../dtos/user-dto");
const ApiError = require('../exceptions/api-error');
const tokenService = require("./token-service");

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

    async createUser(email, hashedPassword, username) {
        return await User.create({
            email,
            password: hashedPassword,
            username,
        });
    }

    async checkExistingUser(email) {
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
        }
    }

    async registration(email, password, deviceInfo) {
        try {
            await this.checkExistingUser(email);
            const salt = await generateUniqueValue();
            const hashedPassword = await this.hashPassword(password, salt);
            const username = await this.generateUniqueUsername();
            const user = await this.createUser(email, hashedPassword, username);
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(userDto);
            console.log(tokens.refreshToken);
            await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceInfo);
            return {tokens: tokens, user: userDto, deviceInfo};
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.InternalServerError('Произошла ошибка при регистрации пользователя');
        }
    }
}

module.exports = new UserService();