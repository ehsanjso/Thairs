const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User();

  try {
    const token = jwt.sign({ _id: user._id.toString() }, "ehsanjsoishere");
    user.token = token;
    user.question = 0;
    user.cluster = -1;
    await user.save();
    res.status(201).send({ user, token: user.token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.token);
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
