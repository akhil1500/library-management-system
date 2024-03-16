const { getJwtToken } = require("../../helpers/jwtClient");
const { getResponseObject } = require("../../helpers/supporter");

const User = require("../../mongoose/models/User");

async function generateToken(userData={}){
    const jwtPayload = {
		id: userData.objectId,
		user : {
            name: userData.name,
            email: userData.email,
            role: userData.role
        }
	};
    return getJwtToken(jwtPayload);
}

module.exports.login = async(req, res, next) => {
    try{
        const response = getResponseObject();
        const {email, password} = req.body;

        console.log("Inside auth", req.body);

        const userData = await User.findOne({email: email}).exec();
        if(!userData){
            response.message = "Email is not registered!";
            return res.status(401).json(response);
        }
        console.log(userData)
        if(userData.password !== password){
            response.message = "Password doesn't match!";
            return res.status(401).json(response);
        }
        const token = await generateToken(userData);

        response.data = {
            name: userData.name,
            email: userData.email,
            role: userData.role,
            tokens: {
                access_token: token
            }
        }

        return res.status(200).json(response);

    }
    catch(err){
        console.error(err,'>>>');
        next(err);
    }
}