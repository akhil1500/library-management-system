const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

const ObjectId = mongoose.Types.ObjectId;

module.exports.getBhDataForAnId = async(req, res, next)=>{
    try{
        const response = getResponseObject();


        const {id: bhId} = req.query;
        // const bhData = await BorrowingHistory.findOne({})
    
        response.message = `Borrow History fetched successfully for ${bhId}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}