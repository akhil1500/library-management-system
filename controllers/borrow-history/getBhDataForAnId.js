const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

const ObjectId = mongoose.Types.ObjectId;

module.exports.getBhDataForAnId = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: bhId} = req.params;

        const bhData = await BorrowingHistory.findOne({_id: new ObjectId(bhId), user_id: req.headers.user.id}).exec();
        if(!bhData){
            response.status = "error";
            response.message = "Borrowing History Doesn't Exist with the given id.";
            return res.status(404).json(response);
        }
        response.data = bhData;
    
        response.message = `Borrow History fetched successfully for ${bhId}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}