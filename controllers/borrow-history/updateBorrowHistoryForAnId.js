const { getResponseObject } = require("../../helpers/supporter")

module.exports.updateBorrowHistoryForAnId = (req, res)=>{
    const response = getResponseObject();

    const {id: bhId} = req.body;

    response.message = `Borrow History updated for ${bhId} `;

    return res.status(200).json(response);
}