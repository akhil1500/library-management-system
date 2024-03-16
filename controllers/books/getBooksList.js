const mongoose = require("mongoose");

const { getResponseObject } = require("../../helpers/supporter");

const Book = require("../../mongoose/models/Book");

module.exports.getBooksList = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {page_no: pageNo=1, page_size: pageSize=20} = req.query;
        const skip = pageNo > 0 ? (parseInt(pageNo) - 1) * pageSize : 0;

        const promises = [
            Book.find({}).skip(skip).limit(pageSize).exec(),
            Book.countDocuments({}).exec()
        ]
        const result = await Promise.all(promises);
        const bookList = result[0];
        const totalCount = result[1];

        response.data = {
            book_list: bookList,
            total_books: totalCount,
            total_pages: Math.ceil(totalCount/pageSize)
        }
    
        response.message = `${bookList.length} users fetched for page no ${pageNo}`;
        
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}