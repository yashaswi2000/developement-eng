const Comments = require("../models/comments");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await Comments.getAll();

  res.send(comments);
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.getAllPostComments(postId);

  res.send(comments);
});

router.post("/", async (req, res) => {
  const newComment = req.body;
  const addedComment = await Comments.add(newComment);

  res.send(addedComment);
});

router.put("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const updatedComment = req.body;
  const result = await Comments.update(commentId, updatedComment);

  res.send(result);
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const result = await Comments.deleteOne(commentId);

  res.send(result);
});

module.exports = router;
