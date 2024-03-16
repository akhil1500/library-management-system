const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");

const Book = require("../../mongoose/models/Book");

const ObjectId = mongoose.Types.ObjectId;


module.exports.getBookById = async(req, res, next)=>{
    try{
        const response = getResponseObject();
        const bookId = req.params.id;

        const bookData = await Book.findOne({_id: new ObjectId(bookId)}).exec();
        if(!bookData){
            response.status = "error";
            response.message = "Book not found";
            return res.status(404).json(response);
        }
        
        response.data = bookData;
        response.message = `Book Details Fetched for the given id ${bookId}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}