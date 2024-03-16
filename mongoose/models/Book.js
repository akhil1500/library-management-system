const mongoose = require("mongoose");
// const mongoose = require("../index")

const {Schema} = mongoose;

const bookSchema = new Schema(
    {
        title: {
            type: String
        },
        author: {
            type: String
        },
        genre: {
            type: String
        },
        published_year: {
            type: Number
        },
        isbn: {
            type: String
        },
        quantity_in_stock: {
            type: Number
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("books", bookSchema);
