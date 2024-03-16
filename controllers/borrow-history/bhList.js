const { getResponseObject } = require("../../helpers/supporter");

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

module.exports.bhList = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {page_no: pageNo=1, page_size: pageSize=20} = req.query;
        const skip = pageNo > 0 ? (parseInt(pageNo) - 1) * pageSize : 0;

        const promises = [
            BorrowingHistory.find({}).skip(skip).limit(pageSize).exec(),
            BorrowingHistory.countDocuments({}).exec()
        ];
        const result = await Promise.all(promises);
        const bhList = result[0];
        const totalCount = result[1];

        response.data = {
            bh_list: bhList,
            total_bh: totalCount,
            total_pages: Math.ceil(totalCount/pageSize)
        }
    
        response.message = `${bhList.length} Borrow History fetched for given ${pageNo}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}