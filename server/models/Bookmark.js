const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: String,
  title: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);