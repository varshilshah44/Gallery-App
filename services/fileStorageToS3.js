const config = require('../config/config');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');

exports.fileUploadToS3 = (bucketpath) => {
aws.config.update({
    secretAccessKey:config.aws.secretAccessKey,
    accessKeyId:config.aws.accessKeyId,
    region:config.aws.region
})

const s3 = new aws.S3();

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:bucketpath,
        acl:'public-read',
        metadata: (req,file,cb) => {
            cb(null,{fieldName:file.fieldname});
        },
        key: (req,file,cb) => {
            const ext = path.extname(file.originalname);
            const index = file.originalname.lastIndexOf('.');
            file.originalname = file.originalname.substring(0,index);
            cb(null,file.originalname + "-" + Date.now() + ext);
        }
    })
})
    return upload;
}