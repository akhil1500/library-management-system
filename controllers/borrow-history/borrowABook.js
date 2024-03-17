const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");
const Book = require("../../mongoose/models/Book");
const User = require("../../mongoose/models/User");

const ObjectId = mongoose.Types.ObjectId;

module.exports.borrowABook = async(req, res, next)=>{
    try{
        const response = getResponseObject();
        const content = req.body;
        const promises = [
            Book.findOne({_id: new ObjectId(content.book_id)}).exec(),
            User.findOne({_id: new ObjectId(req.headers.user.id)}).exec()
        ]
        const result = await Promise.all(promises);
        const bookData = result[0];
        const userData = result[1];
        if(!userData){
            response.status = "error";
            response.message = "User doesn't exist!";
            return res.status(404).json(response);
        }
        if(!bookData){
            response.status = "error";
            response.message = "Book doesn't exist in the library!";
            return res.status(404).json(response);
        }

        if(!bookData.quantity_in_stock){
            response.status = "error";
            response.message = "Book quantity out of stock in the library!";
            return res.status(404).json(response);
        }

        const borrowHistory = new BorrowingHistory({
            user_id: req.headers.user.id,
            book_id: content.book_id,
            borrowed_date: new Date(),
            status: "borrowed"
        });
        const newBorrowHistory = await borrowHistory.save();
        response.data = newBorrowHistory;
        await Book.updateOne({
            _id: new ObjectId(content.book_id)
        }, {
            $inc: {
                quantity_in_stock: -1
            }
        })

        response.message = `Borrow Book History is updated successfully for ${req.headers.user.id}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}