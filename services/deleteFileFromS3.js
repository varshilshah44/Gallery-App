const config = require("../config/config");
const aws = require("aws-sdk");

exports.deleteFileFromS3 = async (bucketPath, key) => {
  aws.config.update({
    secretAccessKey: config.aws.secretAccessKey,
    accessKeyId: config.aws.accessKeyId,
    region: config.aws.region,
  });

  const s3 = new aws.S3();

  s3.deleteObject(
    {
      Bucket: bucketPath,
      Key: key,
    },
    function(err,data){
        if(err){
            return err;
        }
        else{
            return data;
        }
    }
  );
};
