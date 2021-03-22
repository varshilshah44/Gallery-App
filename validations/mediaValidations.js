const joi = require('joi');

const schema = joi.object().keys({
    url:joi.string().required(),
    type:joi.string().required(),
    isFavorite:joi.boolean(),
    user:joi.required()
});

module.exports = schema