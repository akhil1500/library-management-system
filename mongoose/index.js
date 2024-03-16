// const Mongoose = require("mongoose");

// function connectToMongo(){
//     const config = JSON.parse(process.env.MONGO_CONFIG);
//     const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/olms";
//     if(MONGO_URL){
//         // Mongoose.connect(MONGO_URL, config.database.options);
//         Mongoose.createConnection(MONGO_URL, config.database.options);
//     }

//     Mongoose.connection.on("open", ()=>{
//         console.log("Mongo DB is Connected!");
//         const Book = require("./models/Book");
//         const BorrowingHistory = require("./models/BorrowingHistory");
//         const User = require("./models/User");
//     })
//     Mongoose.connection.on("error", (err)=>{
//         console.log("Mongodb Connection Failed!");
//         throw err;
//     })

//     return Mongoose;
// }

// module.exports = connectToMongo;

const mongoose = require("mongoose");
mongoose.set("autoIndex", true);

const config = JSON.parse(process.env.MONGO_CONFIG);
let MONGO_URL = process.env.MONGO_URL || "mongodb://master:master@localhost:27017/olms";
MONGO_URL = `${MONGO_URL}?authSource=admin`;

console.log(MONGO_URL);


// const connection = mongoose.createConnection(MONGO_URL, config.database.options);

// Event listeners for connection
// connection.on("error", error => {
//     console.error("MongoDB connection error:", error);
// });

// connection.once("open", () => {
//     console.log("MongoDB connection established successfully");
// });

async function main() {
// const connection = mongoose.createConnection(MONGO_URL, config.database.options);    
  await mongoose.connect(MONGO_URL, config.database.options);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// mongoose.olms = connection;

module.exports = main;