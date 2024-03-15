const { getResponseObject } = require("../../helpers/supporter");

module.exports.getBooksList = (req, res, next)=>{
    const response = getResponseObject();

    const {page_no: pageNo=1, page_size: pageSize=20} = req.query;

    response.message = `${pageSize} Books fetched for page ${pageNo}`;

    return res.status(200).json(response);
}