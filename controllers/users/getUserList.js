const { getResponseObject } = require("../../helpers/supporter");

const User = require("../../mongoose/models/User");

module.exports.getUserList = async(req, res, next)=>{
    try{
        const response = getResponseObject();

        const {page_no: pageNo=1, page_size: pageSize=20} = req.query;
        const skip = pageNo > 0 ? (parseInt(pageNo) - 1) * pageSize : 0;
    
        const promises = [
            User.find({},{password: 0}).skip(skip).limit(pageSize).exec(),
            User.countDocuments({}).exec()
        ];
        const result = await Promise.all(promises);
        const userList = result[0];
        const totalCount = result[1];
        
        response.data = {
            user_list: userList,
            total_users: totalCount,
            total_pages: Math.ceil(totalCount/pageSize)
        };
        response.message = `${userList.length} users fetched for page no ${pageNo}`;
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}