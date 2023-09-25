const jwt = require("jsonwebtoken");
const {Session} = require("../models/session-model");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            {...payload},
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: "30m"}
        );
        const refreshToken = jwt.sign(
            {...payload},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: "30d"}
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId, refreshToken, deviceInfo) {
        console.log(deviceInfo);
        await Session.create({
            userId,
            refreshToken,
            browserName: deviceInfo.browser.name,
            browserVersion: deviceInfo.browser.version,
            operatingSystemName: deviceInfo.operatingSystem.os,
            operatingSystemVersion: deviceInfo.operatingSystem.os_version,
            device: deviceInfo.device.name,
        });
    }
}

module.exports = new TokenService();