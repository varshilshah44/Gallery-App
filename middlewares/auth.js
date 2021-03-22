const User = require("../models/userModel");
const {findUserByToken} = require('../services/userService');
const createError = require("http-errors");

exports.authentication = async (req, res, next) => {
  if (!req.headers.authorization)
    return next(new createError(500, "Please provide the token"));

  const token = req.headers.authorization;
  const user = await findUserByToken(token);
  if (!user)
    return next(new createError(500, "Sorry! You are not authorized user"));

  if (user.tokenExpire < Date.now())
    return next(new createError(500, "Session timeout! Please login again"));

  req.user = user;
  next();  
};
