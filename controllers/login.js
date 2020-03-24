const Users = require("../models/users");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  const userToCheck = req.body;

  let user = await Users.auth({email: userToCheck.email});
  if(!user.length) {
    res.json('user not existed');
    return;
  }

  user = await Users.auth(userToCheck);
  if(user.length) {
    res.json(user);
    return;
  }

  res.json('email or password do not match');
});

module.exports = router;
