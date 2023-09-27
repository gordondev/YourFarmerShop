const {User} = require('../models/user-model');
const {generateUniqueValue} = require('../utils/generateUniqueValue');
const argon2Utils = require('../utils/argon2Utils');
const UserDto = require("../dtos/user-dto");
const ApiError = require('../exceptions/api-error');
const tokenService = require("./token-service");
const mailService = require("./mail-service");

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
            email, password: hashedPassword, username,
        });
    }

    async checkExistingUserForLogin(email) {
        const existingUser = await User.findOne({where: {email}});
        if (!existingUser) {
            throw ApiError.BadRequest('Пользователь не был найден');
        }
        return existingUser;
    }

    async verifyPassword(password, hashedPassword) {
        return await argon2Utils.verifyPassword(password, hashedPassword);
    }

    async generateVerificationCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }

        return code;
    }

    async verifyDevice(email, deviceInfo, verificationCode) {
        try {
            const user = await User.findOne({where: {email, verificationCode}});
            if (!user) {
                console.error('Неверный код подтверждения');
                throw 'Неверный код подтверждения';
            }
            const userDto = new UserDto(user);
            console.log('Код подтверждения успешно проверен, данные о пользователе получены.');

            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceInfo)

            return {tokens: tokens, user: userDto, deviceInfo};
        } catch (error) {
            console.error('Произошла ошибка при проверке кода подтверждения и получении данных о пользователе:');
            if (error instanceof ApiError) {
                throw error;
            }
            throw ApiError.InternalServerError('Произошла ошибка при проверке кода подтверждения и получении данных о пользователе');
        }
    }

    async registration(email, password, deviceInfo) {
        try {
            const existingUser = await User.findOne({where: {email}});
            if (existingUser) {
                throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
            }

            const salt = await generateUniqueValue();
            const hashedPassword = await this.hashPassword(password, salt);
            const username = await this.generateUniqueUsername();

            const user = await this.createUser(email, hashedPassword, username);
            const userDto = new UserDto(user);

            const tokens = tokenService.generateTokens(userDto);
            await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceInfo);

            return {tokens: tokens, user: userDto, deviceInfo};
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.InternalServerError('Произошла ошибка при регистрации пользователя');
        }
    }

    async login(email, password) {
        try {
            const existingUser = await User.findOne({where: {email}});
            if (!existingUser) {
                throw ApiError.BadRequest('Пользователь не был найден');
            }

            const isPassEquels = await this.verifyPassword(password, existingUser.password);
            if (!isPassEquels) {
                throw ApiError.InternalServerError('Неверный пароль');
            }

            const code = await this.generateVerificationCode();
            const userDto = new UserDto(existingUser);

            try {
                await mailService.sendActivationMail(email, userDto.username, code);
            } catch (error) {
                console.log(error);
                throw ApiError.InternalServerError('Произошла ошибка при отправке письма');
            }

            await existingUser.update({verificationCode: code});

            return 'На вашу почту было отправленно письмо с кодом подтверждения';
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw ApiError.InternalServerError('Произошла ошибка при авторизации');
        }
    }
}

module.exports = new UserService();