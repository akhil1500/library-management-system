const { getResponseObject } = require("../../helpers/supporter")

module.exports.bhList = (req, res, next)=>{
    const response = getResponseObject();

    const {page_no: pageNo, page_size: pageSize=50} = req.query;

    response.message = `${pageSize} Borrow History fetched for given ${pageNo}`;

    return res.status(200).json(response);
}