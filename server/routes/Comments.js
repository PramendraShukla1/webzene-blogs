const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.js");
const verifyToken = require("../VerifyToken.js");




//!CREATE COMMENT

router.post('/create',verifyToken,async(req,res)=>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(201).json(savedComment)

    } catch (error) {
        res.status(500).json(error)
    }
})

//!UPDATE COMMENT

router.put("/:id",verifyToken, async (req, res) => {
  try {
   const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//!DELETE COMMENTS

router.delete("/:id",verifyToken, async (req, res) => {
  try {
   await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Comment has been deleted successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
});


  //!GET POST COMMENTS

router.get("/posts/:postId", async (req, res) => {
    try {
      const comments = await Comment.find({postId:req.params.postId})
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json(error);
    }
  });




module.exports = router;
