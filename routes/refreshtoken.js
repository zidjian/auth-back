const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("refreshtoken")
});

module.exports = router;

