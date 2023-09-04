const { generateAccessToken } = require("../auth/generateTokens");
const { getTokenFromHeader } = require("../auth/getTokenFromHeader");
const { verifyRefeshToken } = require("../auth/verifyTokens");
const getUserInfo = require("../lib/getUserInfo");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");

const router = require("express").Router();

router.post("/", async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);
    if (refreshToken) {
        try {
            const found = await Token.findOne({ token: refreshToken });

            if (!found) {
                res.status(401).send(
                    jsonResponse(401, { error: "Unauthorized1" })
                );
            }

            const payload = verifyRefeshToken(found.token);

            if (payload) {
                const newAccessToken = generateAccessToken(payload);
                console.log("hola", newAccessToken);
                
                res.status(200).send(jsonResponse(200, { newAccessToken }));
            } else {
                res.status(401).send(
                    jsonResponse(401, { error: "Unauthorized2" })
                );
            }
        } catch (error) {
            res.status(401).send(jsonResponse(401, { error: "Unauthorized3" }));
        }
    } else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
    }
});

module.exports = router;
