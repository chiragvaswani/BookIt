const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOwner: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
