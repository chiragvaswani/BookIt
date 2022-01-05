const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  username: { type: String },
  date: { type: String },
  courtName: { type: String },
  email: { type: String },
  slot: { type: Number },
  cost: { type: Number },
});

module.exports = mongoose.model("booking", bookingSchema);
