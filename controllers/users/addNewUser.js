const { getResponseObject } = require("../../helpers/supporter");

const User = require("../../mongoose/models/User");

module.exports.addNewUser = async(req, res, next)=>{
    const response = getResponseObject();
    try{
        const content = req.body;
        if(["member", "librarian"].indexOf(content.role) === -1){
            response.status = "error";
            response.message = "Invalid role selected!";
            return res.status(401).json(response);
        }
    
        const user = new User({
            name: content.name,
            email: content.email,
            role: content.role,
            password: content.password
        })
    
        const newUser = await user.save();
        response.data = newUser;    
        response.message = "New User added successfully!";
    
        return res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        console.log(err.code)
        if(err.code === 11000){
            response.status = "error";
            response.message = `User already exist with the given email ${req.body.email}`
            return res.status(401).json(response);
        }
        next(err);
    }
}