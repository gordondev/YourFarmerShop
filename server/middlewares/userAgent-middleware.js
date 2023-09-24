const useragent = require('express-useragent');

function analyzeUserAgent(req, res, next) {
    const userAgent = useragent.parse(req.headers['user-agent']);

    req.clientInfo = {
        browser: {
            name: userAgent.browser,
            version: userAgent.version,
        },
        operatingSystem: {
            name: userAgent.os,
            version: userAgent.os_version,
        },
        device: {
            name: userAgent.isMobile ? 'Mobile' : 'Desktop',
        },
    };

    next();
}

module.exports = analyzeUserAgent;
