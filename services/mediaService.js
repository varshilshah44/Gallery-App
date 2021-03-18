const Media = require('../models/mediaModel');

exports.addMedia = (data) => {
    return Media.create(data);
}

exports.userMedia = (userid,type) => {
    return Media.find({user:userid,type:type}).select('-user -__v');
}

exports.removeMedia = (mediaid) => {
    return Media.findByIdAndDelete(mediaid);
}

exports.getMedia = (mediaid) => {
    return Media.findById(mediaid);
}

exports.userFavouriteMedia = (userid,type) => {
    return Media.find({user:userid,isFavorite:true,type:type}).select('-__v -user')
}