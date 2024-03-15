const { getResponseObject } = require("../../helpers/supporter")

module.exports.getBhDataForAnId = (req, res, next)=>{
    const response = getResponseObject();

    const {id: bhId} = req.query;

    response.message = `Borrow History fetched successfully for ${bhId}`;

    return res.status(200).json(response);
}