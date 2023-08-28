const Mongoose = require("mongoose");
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("./../schema/user");

const router = require("express").Router();

router.post("/", async (req, res) => {
    const { name, user, password } = req.body;
    if (!name || !user || !password) {
        return res.status(400).send(
            jsonResponse(400, {
                error: "Compos requeridos",
            })
        );
    }

    try {
        const existUser = new User();
        const exist = await existUser.userExist(user);
        if (exist) {
            return res.status(400).send(
                jsonResponse(400, {
                    error: "El nombre de usuario ya existe.",
                })
            );
        }

        const newUser = new User({ name, user, password });
        newUser.save();

        res.status(200).json(
            jsonResponse(200, {
                message: "Usuario creado.",
            })
        );
    } catch (error) {
        return res.status(400).send(
            jsonResponse(400, {
                error: "Ocurrio un error.",
            })
        );
    }
});

module.exports = router;
