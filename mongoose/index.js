const Mongoose = require("mongoose");

function connectToMongo(){
    const config = JSON.parse(process.env.MONGO_CONFIG);
    const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/olms";
    if(MONGO_URL){
        Mongoose.connect(MONGO_URL, config.database.options)
    }

    Mongoose.connection.on("open", ()=>{
        console.log("Mongo DB is Connected!");
        const Book = require("./models/Book");
        const BorrowingHistory = require("./models/BorrowingHistory");
        const User = require("./models/User");
    })
    Mongoose.connection.on("error", (err)=>{
        console.log("Mongodb Connection Failed!");
        throw err;
    })

    return Mongoose;
}

module.exports = connectToMongo;