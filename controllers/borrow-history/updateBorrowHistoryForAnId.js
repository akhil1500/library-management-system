const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter")

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

module.exports.updateBorrowHistoryForAnId = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: bhId} = req.body;
    
        response.message = `Borrow History updated for ${bhId} `;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}