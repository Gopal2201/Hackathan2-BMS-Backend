const router = require("express").Router();
const db = require("../Database/MongoDbDetails");

router.get("/", async (req, res) => {
    console.log("req received");
    const data = await db.movies.find({}).toArray();
    res.send(data);
});

module.exports = router;

