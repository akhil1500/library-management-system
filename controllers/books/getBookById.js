const { getResponseObject } = require("../../helpers/supporter")

module.exports.getBookById = (req, res, next)=>{
    const response = getResponseObject();
    const bookId = req.params.id;

    response.message = `Book Details Fetched for the given id ${bookId}`;

    return res.status(200).json(response);
}