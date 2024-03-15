const { getResponseObject } = require("../../helpers/supporter")

module.exports.updateUserDetails = (req, res, next)=>{
    const response = getResponseObject();

    const {id: userId} = req.body;

    response.message = `User details updated successfully ${userId}`;

    return res.status(200).json(response);
}