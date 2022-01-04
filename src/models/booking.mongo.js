const mongoose = require("mongoose");
const { Schema } = mongoose;

const Slots = require("./slots.mongo.js");

const bookingSchema = new Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  courtName: { type: String, required: true },
  ownerUsername: { type: String, required: true },
  slot: { type: Slots, required: true },
  cost: { type: Number, required: true },
});

module.exports = mongoose.model("booking", bookingSchema);
