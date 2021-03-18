const userRouter = require("../routes/user");
const mediaRouter = require("../routes/media");
const { userDetails } = require("../services/userService");
const { userMedia, userFavouriteMedia } = require("../services/mediaService");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get("/profile", async (req, res, next) => {
  const user = await userDetails(req.query.userid);
  res.render("profile", {
    user: user,
  });
});

router.get("/dashboard", async (req, res, next) => {
  if (!req.query.isfavourite) {
    const user = await userDetails(req.query.userid);
    const media = await userMedia(req.query.userid, req.query.type);
    res.render("dashboard", {
      user: user,
      media: media,
      flag: 1,
    });
  } else {
    const user = await userDetails(req.query.userid);
    const media = await userFavouriteMedia(req.query.userid, req.query.type);
    res.render("dashboard", {
      user: user,
      media: media,
      flag: 2,
    });
  }
});

router.get("/videos", async (req, res, next) => {
  if (!req.query.isfavourite) {
    const user = await userDetails(req.query.userid);
    const media = await userMedia(req.query.userid, req.query.type);
    res.render("videos", {
      user: user,
      media: media,
      flag: 1,
    });
  } else {
    const user = await userDetails(req.query.userid);
    const media = await userFavouriteMedia(req.query.userid, req.query.type);
    res.render("videos", {
      user: user,
      media: media,
      flag: 2,
    });
  }
});

router.use("/api/user", userRouter);
router.use("/api/media", mediaRouter);

module.exports = router;
