const { getResponseObject } = require("../../helpers/supporter")

const Book = require("../../mongoose/models/Book");

module.exports.addNewBook = async(req, res, next)=>{
    try{
        const response = getResponseObject();
        const content = req.body;

        const book = new Book({
            title: content.title,
            author: content.author,
            genre: content.genre,
            published_year: content.published_year,
            isbn: content.isbn,
            quantity_in_stock: content.quantity_in_stock
        })

        const newBook = await book.save();

        response.data = newBook;
        response.message = "New Book Added Successfully!!";
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}