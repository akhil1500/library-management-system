const { getResponseObject } = require("../../helpers/supporter")

module.exports.addNewBook = (req, res, next)=>{
    const response = getResponseObject();

    response.message = "New Book Added Successfully!!";

    return res.status(200).json(response);
}