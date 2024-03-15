const { getResponseObject } = require("../../helpers/supporter")

module.exports.deleteBook = (req, res, next)=>{
    const response = getResponseObject();

    const {id: bookId} = req.params;

    response.message `${bookId} deleted successfully!!`;

    return res.status(200).json(response);
}