const { authentication } = require("../middlewares/auth");
const {checkBody} = require("../middlewares/checkBody");
const {checkUserImageAndDelete} = require("../middlewares/deleteImageFromS3");
const {
  signup,
  login,
  userDetails,
  updateUser,
  updateUserImage,
  removeImage
} = require("../controllers/userController");
const { fileUploadToS3 } = require("../services/fileStorageToS3");

const express = require("express");
const router = express.Router();

router.post("/signup",signup);
router.put("/login", login);
router.get("/user-details/:userid", authentication, userDetails);
router.put("/modify-user/:userid", authentication, checkBody, updateUser);
router.put("/modify-image/:userid", authentication,checkUserImageAndDelete,fileUploadToS3("varshilgallerybucket/user").single("image"),updateUserImage);
router.delete("/remove-image/:userid",authentication,removeImage)
module.exports = router;
