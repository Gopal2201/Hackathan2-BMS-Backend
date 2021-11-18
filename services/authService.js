const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../Database/MongoDbDetails");

const service = {
    async register(req, res) {
        try {
            // Check if user already exists
            req.body.email = req.body.email.toLowerCase();
            const user = await db.admin.findOne({email: req.body.email});
            if (user) { return res.sendStatus(400) };
            
            // Encrypt Password
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt)
            // Insert User to DB
        await db.users.insertOne(req.body);
        res.send("User added");
        } catch (err) {
            console.error("Insert error");
        }
    },
    async login(req, res) {
        try {
            // Check if user already exists
            req.body.email = req.body.email.toLowerCase();
            const user = await db.users.findOne({email: req.body.email});
            if (!user) { return res.sendStatus(400) };
            
            // Check Password Match
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {return res.sendStatus(400)};

            // Generate auth token
            const authToken = jwt.sign({userId: user._id}, "Gopal123")
            
        res.send({Message: "User logged in successfully", authToken});
        } catch (err) {
            console.error("Logging error");
        }
    },
    async AdminLogin(req, res) {
        try {
            // Check if user already exists
            req.body.email = req.body.email.toLowerCase();
            const user = await db.admin.findOne({email: req.body.email});
            if (!user) { return res.sendStatus(400) };
            
            // Check Password Match
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {return res.sendStatus(400)};

        // Generate auth token
        const authToken = jwt.sign({userId: user._id}, "Gopal123")
        
    res.send("User logged in successfully", authToken);
        } catch (err) {
            console.error("Logging error");
        }
    },

};

module.exports = service;
