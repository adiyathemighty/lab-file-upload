const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const fs = require("fs");
const User = require("../models/User");
const fileUpload = require("express-fileupload");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("upload");
});

router.post("/", (req, res) => {
  req.files.pic.mv(`public/images/${req.files.pic.name}`, err => {
    if (err) return res.status(500).send(err);

    upload(`public/images/${req.files.pic.name}`).then(result => {
      new User({ pic: result.secure_url }).save().then(user => {
        res.send(user);
      });
    });
  });
});

module.exports = router;
