const Users = require("../models/users");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const result = await Users.getAll();
  
  res.send(result);
});

router.post("/", async (req, res) => {
  const newPost = req.body;
  const result = await Users.add(newPost);

  res.send(result);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  const result = await Users.update(id, updatedPost);
  
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Users.deleteOne(id);

  res.send(result);
});


module.exports = router;
