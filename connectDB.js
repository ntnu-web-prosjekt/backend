const mongoose = require("mongoose");

/**
* Connects to MongoDB using URI from .env
*
*/
async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, () => {
            console.log("Connected to the database");
        });

    } catch(error) {
        console.log(`Error occured regarding the connection to DB: ${error}`);
    }
}

module.exports = connectDB;