const mongoose = require('mongoose');
const db = require('../db/connection');

const mediaSchema = new mongoose.Schema({
    url:String,
    type:{
        type:String,
        enum:{
            values:['image','video'],
            message:'media type is not valid'
        }
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user' 
    }
},{collation:'media'});

const Media = db.model('media',mediaSchema);
module.exports = Media;