const { addMedia,getUserMedia,removeMedia,changeToFavourites,userFavouriteMedia,getMedia } = require("../controllers/mediaController");
const {fileUploadToS3} = require("../services/fileStorageToS3");
const {authentication} = require("../middlewares/auth");
const {checkMediaImageAndDelete} = require("../middlewares/deleteImageFromS3");
const express = require("express");
const router = express.Router();

router.post("/add",authentication,fileUploadToS3('varshilgallerybucket/media').array('image'),addMedia);
router.get("/user-media/:userid/:type",authentication,getUserMedia);
router.delete("/media-remove/:mediaid",authentication,checkMediaImageAndDelete,removeMedia);
router.put("/isfavourite/:mediaid",authentication,changeToFavourites);
router.get("/user-favourite/:userid/:type",authentication,userFavouriteMedia);
router.get("/get-media/:mediaid",authentication,getMedia)
module.exports = router;
