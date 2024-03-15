const { getResponseObject } = require("../../helpers/supporter")

module.exports.getUserList = (req, res, next)=>{
    const response = getResponseObject();

    const {page_no: pageNo=1, page_size: pageSize=20} = req.query;

    response.message = `${pageSize} users fetched for page no ${pageNo}`;

    return res.status(200).json(response);
}