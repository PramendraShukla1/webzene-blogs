const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const verifyToken = require("../VerifyToken.js");
const Comment = require('../models/Comment.js')




//!CREATE POST

router.post('/create',verifyToken,async(req,res)=>{
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)

    } catch (error) {
        res.status(500).json(error)
    }
})

//!UPDATE POST

router.put("/:id",verifyToken, async (req, res) => {
  try {
   const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//!DELETE POST

router.delete("/:id",verifyToken, async (req, res) => {
  try {
   await Post.findByIdAndDelete(req.params.id)
   await Comment.deleteMany({postId:req.params.id})
    res.status(200).json({ message: "Post has been deleted successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//!GET ALL POST

router.get("/", async (req, res) => {
    const query = req.query
    console.log(query)
    try {

        const searchFilter = {
            title:{$regex:query.search, $options:"i"}
        }
      const posts = await Post.find(query.search? searchFilter:null)
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //!GET POST DETAILS
  
router.get("/:id",async (req,res)=>{
  try{
      const post=await Post.findById(req.params.id)
      res.status(200).json(post)
  }
  catch(err){
      res.status(500).json(err)
  }
})

  //!GET USER POST

router.get("/user/:userId", async (req, res) => {
    try {
      const posts = await Post.find({userId:req.params.userId})
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  });







module.exports = router;
