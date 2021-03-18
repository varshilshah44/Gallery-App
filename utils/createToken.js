const config = require('../config/config');
const jwt = require('jsonwebtoken');


exports.createToken = (userid) => {
    return jwt.sign({id:userid},config.jwt.jwtKey)
}