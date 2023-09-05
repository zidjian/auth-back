const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.status(200).send(jsonResponse(200, req.user));
});

module.exports = router;
