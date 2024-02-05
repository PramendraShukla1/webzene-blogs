const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");
const verifyToken = require("../VerifyToken.js");

//!Update User

router.put("/:id",verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(15);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//!DELETE USER

router.delete("/:id",verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.body.id });
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//!GET USER

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const {password, ...userInfo} = user._doc
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  });




module.exports = router;
