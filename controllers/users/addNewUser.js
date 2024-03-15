const { getResponseObject } = require("../../helpers/supporter")

module.exports.addNewUser = (req, res, next)=>{
    const response = getResponseObject();
    
    response.message = "New User added successfully to the system!";

    return res.status(200).json(response);
}