const { MongoClient } = require("mongodb")



const mongo = {
    movies: null,
    users: null,
    admin: null,
    async connect() {
        try{
            const mongodbClient = new MongoClient(process.env.MONGODB_URL);
            await mongodbClient.connect();

            const db = await mongodbClient.db(process.env.MONGODB_NAME);

            this.movies = db.collection("movies")
            this.users = db.collection("users")
            this.admin = db.collection("admin")
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = mongo;