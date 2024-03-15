const { getResponseObject } = require("../../helpers/supporter")

module.exports.updateBookDetails = (req, res, next)=>{
    const response = getResponseObject();

    const {id: bookId} = req.body;

    response.message = `Book data updated successfully for ${bookId}`;

    return res.status(200).json(response);
}