const { verify } = require("jsonwebtoken");
const { getTokenFromHeader } = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

function authenticate(res, req, next) {
    const token = getTokenFromHeader(req.headers);

    if (token) {
        const decoded = verifyAccessToken(token);

        if (decoded) {
            req.user = { ...decoded.user };

            next();
        } else {
            res.status(401).send(
                jsonResponse(401, { message: "No token provided" })
            );
        }
    } else {
        res.status(401).send(
            jsonResponse(401, { message: "No token provided" })
        );
    }
}

module.exports = { authenticate };
