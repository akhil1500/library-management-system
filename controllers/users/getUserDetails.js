const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");

const User = require("../../mongoose/models/User");

const ObjectId = mongoose.Types.ObjectId;

module.exports.getUserDetails = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: userId} = req.params;
        const userData = await User.findOne({_id: new ObjectId(userId)}, {password: 0}).exec();
        if(!userData){
            response.message = "User details doesn't exist for the given id.";
            return res.status(401).json(response);
        }
        response.data = userData;
        response.message = "User details fetched successfully!";
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}