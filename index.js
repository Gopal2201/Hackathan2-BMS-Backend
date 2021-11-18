const express = require("express");
require("dotenv").config();
const cors = require("cors")
const jwt = require("jsonwebtoken");
const AuthRoutes = require("./Routes/AuthRoutes");
const loginRoute = require("./Routes/LoginRoute/LoginRoute");
const movies = require("./MovieList/Movielist");
const MongoDbDetails = require("./Database/MongoDbDetails");

const app = express();

async function loadApp() {
    try {
        await MongoDbDetails.connect();
        
        app.use(cors())
        app.use(express.json());
        
        app.use("/auth", AuthRoutes);

        // Check token exists
        app.use((req, res, next) => {
            console.log(req.headers.authorization)
            let token = req.headers.authorization;
            let token1 = token.split(" ");
            token = token1[1];
            
            try {
                const isValid = jwt.verify(token, process.env.JWT_SECRET);
                next ();
            } catch (err) {
                res.sendStatus(403)
            }
            
        })

        app.use("/movies", movies)
        
        app.listen(process.env.PORT);
    } catch (err) {
        console.error("error starting app")
    }
}

loadApp();

