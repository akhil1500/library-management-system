const mongoose = require("mongoose");
// const mongoose = require("../index");


const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        role: {
            enum: ["member", "librarian"],
            type: String
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("users", userSchema);