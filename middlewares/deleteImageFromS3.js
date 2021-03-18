const { userDetails } = require("../services/userService");
const {getMedia} = require("../services/mediaService");
const { deleteFileFromS3 } = require("../services/deleteFileFromS3");
const createError = require("http-errors");

exports.checkUserImageAndDelete = async (req, res, next) => {
  try {
    if (!req.params.userid) {
      return next(new createError(500, "Please provide the userid in params"));
    }

    const user = await userDetails(req.params.userid);
    if (user.image) {
      await deleteFileFromS3("varshilgallerybucket/user", user.image);
      user.image = undefined;
      await user.save();
    }
    next();
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.checkMediaImageAndDelete = async (req, res, next) => {
  try {
    if (!req.params.mediaid) {
      return next(new createError(500, "Please provide the mediaid in params"));
    }

    const media = await getMedia(req.params.mediaid);
    await deleteFileFromS3("varshilgallerybucket/media", media.url);
    next();
  } catch (err) {
    return next(new createError(500, err.message));
  }
};
