const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (body.username === undefined || body.password === undefined) {
    return res.status(400).json({ error: "content missing" });
  } else if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;
