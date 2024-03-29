const { getResponseObject } = require("../../helpers/supporter")

const Book = require("../../mongoose/models/Book");

module.exports.addNewBookParams = ()=>
    [
        {type: "string", value: "title"},
        {type: "string", value: "author"},
        {type: "string", value: "genre"},
        {type: "int", value: "published_year"},
        {type: "string", value: "isbn"},
        {type: "int", value: "quantity_in_stock"}
    ]

module.exports.addNewBook = async(req, res, next)=>{
    const response = getResponseObject();
    try{
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
        console.log(err.code)
        if(err.code === 11000){
            response.status = "error";
            response.message = `Book already exist with the given isbn ${req.body.isbn}`
            return res.status(401).json(response);
        }

        next(err);
    }
}