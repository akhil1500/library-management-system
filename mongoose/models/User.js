const mongoose = require("mongoose");
// const mongoose = require("../index")()


const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            enum: ["Member", "Librarian"],
            type: String
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("users", userSchema);