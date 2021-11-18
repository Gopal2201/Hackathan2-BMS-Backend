const router = require("express").Router();

const mongo = require("../../Database/MongoDbDetails");

router.post("/admin", async (req, res) => {
    const data = await mongo.db.collection("")
    console.log("login routes")
})

router.post("/", (req, res, next) => {
    console.log("login routes")
    console.log()
})

module.exports = router;

