const User = require('../models/userModel');

exports.signup = (data) => {    
    return User.create(data);
}

exports.findUserByEmail = (email) => {
    return User.findOne({email:email})
}

exports.findUserByToken = (token) => {
    return User.findOne({token:token});
}

exports.userDetails = (userid) => {
    return User.findById(userid).select('-password -token -tokenExpire -__v')
}

exports.updateUser = (userid,data) => {
    return User.findByIdAndUpdate(userid,data,{
        runValidators:false,
        new:true
    });
}

exports.updateImage = (userid,imagekey) => {
    return User.findByIdAndUpdate(userid,{image:imagekey},{
        runValidators:false,
        new:true
    })
}
