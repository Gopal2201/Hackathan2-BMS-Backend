const router = require("express").Router();
const mongo = require("../Database/MongoDbDetails");

router.post("/", async (req, res) => {
    const data = await mongo.db.collection("Movielist").insertOne(req.body);
    res.send(data);
});


module.exports = router;