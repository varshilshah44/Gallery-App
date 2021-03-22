const createError = require("http-errors");
const mediaJoi = require("../validations/mediaValidations");
const {
  addMedia,
  userMedia,
  removeMedia,
  getMedia,
  userFavouriteMedia,
} = require("../services/mediaService");

exports.addMedia = async (req, res, next) => {
  try {
    if (req.files.length === 0) {
      return next(new createError(500, "File isn't uploaded"));
    }
    let i = 1;
    let newMedia = [];
    req.files.forEach(async (el) => {
      req.body.url = el.key;
      const value = await mediaJoi.validateAsync(req.body);
      newMedia.push(await addMedia(value));
      if (i === req.files.length) {
        res.status(201).json({
          status: "success",
          media: newMedia,
        });
      }
      i++;
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.getUserMedia = async (req, res, next) => {
  try {
    if (!req.params.userid || !req.params.type) {
      return next(new createError(500, "Please provide the userid and mediatype in params"));
    }
    const media = await userMedia(req.params.userid,req.params.type);
    res.status(200).json({
      status: "success",
      media,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.removeMedia = async (req, res, next) => {
  try {
    await removeMedia(req.params.mediaid);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.changeToFavourites = async (req, res, next) => {
  try {
    if (!req.params.mediaid) {
      return next(new createError(500, "Please provide the mediaid in params"));
    }
    const media = await getMedia(req.params.mediaid);
    if (media.isFavorite) {
      media.isFavorite = false;
    } else {
      media.isFavorite = true;
    }
    await media.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.userFavouriteMedia = async (req, res, next) => {
  try {
    if (!req.params.userid || !req.params.type) {
      return next(new createError(500, "Please provide the userid and type in params"));
    }
    const media = await userFavouriteMedia(req.params.userid,req.params.type);
    res.status(200).json({
      status: "success",
      media,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.getMedia = async (req,res,next) => {
  try{
    if(!req.params.mediaid){
      return next(new createError(500, "Please provide the mediaid in params"));
    }
    const media = await getMedia(req.params.mediaid);
    res.status(200).json({
      status:'success',
      media
    })
  }
  catch(err){
    return next(new createError(500,err.message));
  }
}