const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const Book = require("../../mongoose/models/Book");

const ObjectId = mongoose.Types.ObjectId;


module.exports.deleteBook = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: bookId} = req.params;

        await Book.deleteOne({_id: new ObjectId(bookId)}).exec();
    
        response.message = `${bookId} deleted successfully!!`;
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}