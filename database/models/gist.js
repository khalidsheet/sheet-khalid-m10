const mongoose = require("mongoose");

const gistModel = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  private: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Gist", gistModel);
