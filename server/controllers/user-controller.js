const userService = require("../service/user-service");

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                res.status(400).json({error: 'Отсутствуют обязательные поля'});
                return;
            }

            const deviceInfo = req.clientInfo;
            const userData = await userService.registration(email, password, deviceInfo);

            res.cookie("refreshToken", userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {emailOrUsername, password} = req.body;

            if (!emailOrUsername || !password) {
                res.status(400).json({error: 'Отсутствуют обязательные поля'});
                return;
            }

            const userData = await userService.login(emailOrUsername, password);

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async verifyDevice(req, res, next) {
        try {
            const {email, verificationCode} = req.body;
            const deviceInfo = req.clientInfo;
            console.log(verificationCode, email);
            const userData = await userService.verifyDevice(email, deviceInfo, verificationCode);

            res.cookie("refreshToken", userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserController();
