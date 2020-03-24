const Users = require("../models/users");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  const newUser = req.body;
  const user = await Users.auth({ email: newUser.email});

  if(user.length) {
    res.json('this email already have an account');
    return;
  }

  const addedUser = await Users.add(newUser);
  res.send(addedUser);
});


module.exports = router;
