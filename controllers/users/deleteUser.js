const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");
const ObjectId = mongoose.Types.ObjectId;

const User = require("../../mongoose/models/User");


module.exports.deleteUser = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {id: userId} = req.params;

        await User.deleteOne({_id: new ObjectId(userId)}).exec();

        response.message = `User - ${userId} deleted successfully!`;
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}