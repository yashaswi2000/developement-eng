const Posts = require("../models/posts");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const result = await Posts.getAll();
  
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Posts.getOne(id);

  res.send(result);
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const posts = await Posts.getByUserId(userId);
  
  res.json(posts);
});

router.post("/", async (req, res) => {
  const newPost = req.body;
  const addedPost = await Posts.add(newPost);

  res.send(addedPost);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  const result = await Posts.update(id, updatedPost);
  
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Posts.deleteOne(id);

  res.send(result);
});


module.exports = router;
