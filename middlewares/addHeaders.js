module.exports = (mongo)=> (req, res, next)=>{
    req.headers.mongo = mongo;

    return next();
}