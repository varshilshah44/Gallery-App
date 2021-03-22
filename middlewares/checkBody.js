const createError = require('http-errors');
exports.checkBody = (req,res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new createError(500,'Please provide the body'));
    }
    next();
}