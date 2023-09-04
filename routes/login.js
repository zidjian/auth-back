const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("./../schema/user");
const getUserInfo = require("./../lib/getUserInfo");

router.post("/", async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send(
            jsonResponse(400, {
                error: "Compos requeridos.",
            })
        );
    }

    const myUser = await User.findOne({ user });

    if (myUser) {
        const correctPassword = await myUser.comparePassword(
            password,
            myUser.password
        );

        if (correctPassword) {
            const accessToken = await myUser.createAccessToken();
            const refreshToken = await myUser.refreshAccessToken()

            res.status(200).json(
                jsonResponse(200, {
                    accessToken,
                    refreshToken,
                    user: getUserInfo(myUser),
                })
            );
        } else {
            return res.status(400).send(
                jsonResponse(400, {
                    error: "Datos incorrectos.",
                })
            );
        }
    } else {
        return res.status(400).send(
            jsonResponse(400, {
                error: "Datos incorrectos.",
            })
        );
    }
});

module.exports = router;
