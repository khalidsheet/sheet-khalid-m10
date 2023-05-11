var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const gists = await mongoose.model("Gist").find().exec();

  res.render("gists/home", {
    title: "Gists",
    gists,
  });
});

router.get("/new", async function (req, res, next) {
  res.render("gists/new", {
    title: "Create Gist",
  });
});

router.post("/new", async function (req, res, next) {
  const { title, description, body, private } = req.body;

  const gist = new mongoose.model("Gist")({
    title,
    description,
    body,
    private: private === "on",
    user: req.cookies.user,
  });

  await gist.save();

  res.redirect("/gists");
});

module.exports = router;
