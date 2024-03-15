const { getResponseObject } = require("../../helpers/supporter")

module.exports.getUserDetails = (req, res, next)=>{
    const response = getResponseObject();

    const {user_id: userId} = req.body;

    response.message = `User Details Fetched Successfully for ${userId}`;

    return res.status(200).json(response);
}