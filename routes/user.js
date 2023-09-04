const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send(jsonResponse(200, req.user));
});

module.exports = router;

