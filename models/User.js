const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "learner",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
