const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");
const Book = require("../../mongoose/models/Book");

const ObjectId = mongoose.Types.ObjectId;

module.exports.updateBorrowHistoryForAnIdParams = ()=>
    [
        {type: "string", value: "book_id"}
    ]

module.exports.updateBorrowHistoryForAnId = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: bhId} = req.params;
        const bhData = await BorrowingHistory.findOne({
            _id: new ObjectId(bhId),
            user_id: new ObjectId(req.headers.user.id),
            book_id: new ObjectId(req.body.book_id)
        }).exec();
        if(!bhData){
            response.status = "error";
            response.message = "Invalid Id!";
            return res.status(404).json(response);
        }
        if(bhData.status !== 'borrowed'){
            response.status = "error";
            response.message = "You have already returned the book!";
            return res.status(409).json(response);
        }

        await BorrowingHistory.findOneAndUpdate({_id: new ObjectId(bhId)}, {$set: {status: "returned"}});
        await Book.findOneAndUpdate({_id: new ObjectId(req.body.book_id)}, {$inc: {quantity_in_stock: 1}});
    
        response.message = `Borrow History updated for ${bhId}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}