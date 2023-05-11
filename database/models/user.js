const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: String,
  password: String,
  gists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gist",
    },
  ],
});

module.exports = mongoose.model("User", userModel);
