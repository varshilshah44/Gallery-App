const joi = require('joi');

const schema = joi.object().keys({
    firstName:joi.string().alphanum().required(),
    lastName:joi.string().alphanum().required(),
    mobile:joi.string().regex(/^[0-9]{10}$/).required(),
    email:joi.string().email().required(),
    password:joi.string().min(5).required(),
    confirmPassword:joi.string().valid(joi.ref('password')).required(),
    address:joi.string().required(),
    image:joi.string()
});

module.exports = schema;