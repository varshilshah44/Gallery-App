const userJoi = require("../validations/userValidations");
const {
  signup,
  findUserByEmail,
  userDetails,
  updateUser,
  updateImage,
} = require("../services/userService");
const { comparePassword } = require("../utils/comparePassword");
const { createToken } = require("../utils/createToken");
const { removeKeys } = require("../utils/removeKeys");
const createError = require("http-errors");
const { deleteFileFromS3 } = require("../services/deleteFileFromS3");

exports.signup = async (req, res, next) => {
  try {
    const value = await userJoi.validateAsync(req.body);
    let newUser = await signup(value);

    newUser = removeKeys(newUser._doc, "password", "createdAt", "__v");

    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(
        new createError(500, "Please provide the email and password")
      );
    }

    let user = await findUserByEmail(req.body.email);
    if (!user) return next(new createError(500, "User doesn't exist"));

    const compare = await comparePassword(user.password, req.body.password);
    if (!compare)
      return next(
        new createError(500, "Please enter the correct email and password")
      );

    const token = createToken(user._id);
    user.token = token;
    user.tokenExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    user = removeKeys(
      user._doc,
      "password",
      "createdAt",
      "updatedAt",
      "__v",
      "tokenExpire"
    );

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.userDetails = async (req, res, next) => {
  try {
    if (!req.params.userid) {
      return next(
        new createError(500, "Please provide the userid in parameter")
      );
    }
    const user = await userDetails(req.params.userid);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!req.params.userid) {
      return next(
        new createError(500, "Please provide the userid in parameter")
      );
    }
    req.body = removeKeys(
      req.body,
      "createdAt",
      "_id",
      "password",
      "token",
      "tokenExpire",
      "image"
    );
    let updatedUser = await updateUser(req.params.userid, req.body);
    updatedUser = removeKeys(
      updatedUser._doc,
      "password",
      "createdAt",
      "updatedAt",
      "__v",
      "tokenExpire",
      "token"
    );

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.updateUserImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(
        new createError(500, "Something went wrong with uploading image")
      );
    }
    const updatedImage = await updateImage(req.params.userid, req.file.key);
    res.status(200).json({
      status: "success",
      image: updatedImage.image,
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};

exports.removeImage = async (req, res, next) => {
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

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(new createError(500, err.message));
  }
};
