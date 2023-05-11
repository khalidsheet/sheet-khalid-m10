var express = require("express");
var router = express.Router();
const { comparePassword } = require("../utils/password");
const mongoose = require("mongoose");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await mongoose
    .model("User")
    .findOne({
      username,
    })
    .exec();

  if (!user) {
    return res.render("index", { error: "User not found" });
  }

  if (!(await comparePassword(password, user.password))) {
    return res.render("index", {
      error: "Password is incorrect",
      old: req.body,
    });
  }

  console.log("User", user);

  res.cookie("user", user._id);

  return res.redirect("/gists");
});

module.exports = router;
