const { getResponseObject } = require("../../helpers/supporter");

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

module.exports.borrowABook = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: userId} = req.body;
    
        response.message = `Borrow Book History is updated successfully for ${userId}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}