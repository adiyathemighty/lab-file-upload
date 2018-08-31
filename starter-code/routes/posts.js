const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const fs = require("fs");
const Post = require("../models/Post");
const fileUpload = require("express-fileupload");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */
router.get("/index", (req, res, next) => {
  Post.find({}).then(posts => {
    console.log(posts);
    res.render("posts/index", { posts });
  });
});

router.get("/new", ensureLoggedIn(), (req, res) => {
  if (req.user) res.render("posts/new");
});

router.post("/create", ensureLoggedIn(), (req, res) => {
  //content, creatorId, picPath, picName
  const { content } = req.body;
  req.files.pic.mv(`public/images/${req.files.pic.name}`, err => {
    if (err) return res.status(500).send(err);

    upload(`public/images/${req.files.pic.name}`).then(result => {
      new Post({
        content,
        picPath: result.secure_url,
        picName: req.files.pic.name,
        creatorId: req.user._id
      })
        .save()
        .then(post => {
          res.redirect("/posts/index");
        });
    });
  });
});

// router.post("/", (req, res) => {
//   req.files.pic.mv(`public/images/${req.files.pic.name}`, err => {
//     if (err) return res.status(500).send(err);

//     upload(`public/images/${req.files.pic.name}`).then(result => {
//       new User({ pic: result.secure_url }).save().then(user => {
//         res.send(user);
//       });
//     });
//   });
// });

module.exports = router;
