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
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Отсутствуют обязательные поля' });
                return;
            }

            const deviceInfo = req.clientInfo;
            const userData = await userService.login(email, password, deviceInfo);

            res.cookie("refreshToken", userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserController();
