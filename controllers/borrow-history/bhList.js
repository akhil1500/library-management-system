const { getResponseObject } = require("../../helpers/supporter");

const BorrowingHistory = require("../../mongoose/models/BorrowingHistory");

function getMatchQuery(req){
    let matchQuery = {};

    // if(req.headers.user.role && req.headers.user.role === 'librarian'){ //If the request is made by librarian then he should be able to view list of all borrowing history
    //     if(req.query.user_ids & req.query.user_ids.length){ // If the librarian has selected to view one particular user's borrowing history.
    //         matchQuery['user_id'] = {
    //             $in: [req.query.user_ids]
    //         };
    //     }
    // }
    // else{
    //     matchQuery['user_id'] = req.headers.user.id;
    // }
    matchQuery['user_id'] = req.headers.user.id;
    if(req.query.book_ids && req.query.book_ids.length){
        matchQuery['book_id'] = {
            $in: [req.query.book_ids]
        };
    }
    if(req.query.borrowed_date){
        matchQuery['borrowed_date'] = req.query.borrowed_date;
    }
    if(req.query.return_date){
        matchQuery['return_date'] = req.query.return_date;
    }
    return matchQuery;
}

module.exports.bhList = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {page_no: pageNo=1, page_size: pageSize=20} = req.query;
        const skip = pageNo > 0 ? (parseInt(pageNo) - 1) * pageSize : 0;

        const matchQuery = getMatchQuery(req);

        const promises = [
            BorrowingHistory.find(matchQuery).skip(skip).limit(pageSize).exec(),
            BorrowingHistory.countDocuments(matchQuery).exec()
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