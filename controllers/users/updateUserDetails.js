const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");

const User = require("../../mongoose/models/User");


module.exports.updateUserDetails = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: userId} = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
        if(!updatedUser){
            response.status = "error";
            response.message = "User doesn't exist!";
            return res.status(401).json(response);
        }

        response.data = updatedUser;    
        response.message = `User details updated successfully ${userId}`;
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}