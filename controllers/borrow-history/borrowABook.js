const { getResponseObject } = require("../../helpers/supporter")

module.exports.borrowABook = (req, res, next)=>{
    const response = getResponseObject();

    const {id: userId} = req.body;

    response.message = `Borrow Book History is updated successfully for ${userId}`;

    return res.status(200).json(response);
}