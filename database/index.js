const mongoose = require("mongoose");

require("./models/user");
require("./models/gist");

const connectToDatabase = async () => {
  const db = await mongoose.connect(
    "mongodb+srv://khalidsheet:khalid_98@cluster0.tpejxlk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  db.connection.on("error", (err) => {
    console.log("Error connecting to database", err);
  });

  db.connection.on("connected", (err, res) => {
    console.log("Connected to database", err);
  });
};

module.exports = { connectToDatabase };
