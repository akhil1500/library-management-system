const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const Book = require("../../mongoose/models/Book");


module.exports.updateBookDetails = async(req, res, next)=>{
    try{
        const response = getResponseObject();
        
        const {id: bookId} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {new: true});
        if(!updatedBook){
            response.status = "error";
            response.message = "Book doesn't exist!";
            return res.status(404).json(response);
        }

        response.data = updatedBook;
        response.message = `Book data updated successfully for ${bookId}`;
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}