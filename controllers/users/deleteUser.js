const { getResponseObject } = require("../../helpers/supporter")

module.exports.deleteUser = (req, res, next)=>{
    const response = getResponseObject();

    const {id: userId} = req.body;

    response.message = `User - ${userId} deleted successfully from the system`;

    return res.status(200).json(response);
}