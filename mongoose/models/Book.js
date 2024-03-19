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
            type: String,
            required: true,
            unique: true
        },
        quantity_in_stock: {
            type: Number
        }
    },
    {timestamps: true, autoIndex: true}
);


bookSchema.index({
    isbn: 1
},{unique: true})

module.exports = mongoose.model("books", bookSchema);
