const bcrypt = require('bcryptjs');

exports.comparePassword = (dbPassword,userPassword) => {
    return bcrypt.compare(userPassword,dbPassword);
}