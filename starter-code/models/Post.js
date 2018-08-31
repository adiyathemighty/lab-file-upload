const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = Schema({
  creatorId: String,
  picPath: String,
  picName: String,
  content: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
