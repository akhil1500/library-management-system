const {verifyJwtToken} = require("../helpers/jwtClient");
const { getResponseObject } = require("../helpers/supporter");

const AUTH_HEADER = "authorization";
const BEARER_AUTH_SCHEME = "bearer";

function parseHeader(headerValue){
    if(typeof headerValue !== 'string'){
        return null;
    }
    const matches = headerValue.split(" ");
    return matches && {
        scheme: matches[0],
        value: matches[1]
    }
}

const getJwtFromRequest = (req)=>{
    const authHeader = req.headers[AUTH_HEADER];

    let token = null;

    if(authHeader){
        const authParams = parseHeader(authHeader);
        if(authParams && authParams.scheme.toLowerCase() === BEARER_AUTH_SCHEME){
            token = authParams.value;
        }
    }

    return token;
}

function isError(e){
    return (
        e &&
        e.stack &&
        e.message &&
        typeof e.stack === 'string' &&
        typeof e.message === 'string'
    )
}

async function validateJwtToken(token, req){
    if(token === null){
        return new Error("Token value is missing!");        
    }
    const decodedToken = await verifyJwtToken(token).catch(err => err);
    if(isError(decodedToken)){
        return { is_success: false, msg: "Jwt is not valid anymore" };
    }

    if(!decodedToken){
        return new Error("Token cannot be decoded!");
    }

    const {id, user} = decodedToken;
    req.headers.user = user;

    return {is_success: true, msg: "Valid!"};
}

const authenticate = (req, res, next) =>{
    const token = getJwtFromRequest(req);

    if(!token){
        const error = new Error("Unauthorized Access");
        error.status = 400;
        error.name = "No authorization header or bearer token found in http";
        next(error);
    }
    validateJwtToken(token, req)
        .then((result)=>{
            if(!result.is_success){
                const error = new Error(result.msg);
                error.status = 401;
                error.name = "No authorization header or bearer token found in http";
                next(error);
            }
            else{
                next();
            }
        })
        .catch((err)=>{
            const error = new Error("Unauthorized Access");
            error.status = 400;
            next(err);
        })
}

const checkLibrarianAccess = (req, res, next)=>{
    if(req.headers.user.role !== 'Librarian'){
        const response = getResponseObject();
        response.status = "error";
        response.message = "Access forbidden!";
        return res.status(403).json(response);
    }
    next();
}

module.exports = {
    authenticate,
    checkLibrarianAccess
}