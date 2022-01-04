const mongoose = require("mongoose");

const { Schema } = mongoose;

const Slots = new Schema({
  startTime: {
    hours: Number,
    minutes: Number,
    required: true,
  },
  endTime: {
    hours: Number,
    minutes: Number,
    required: true,
  },
});

module.exports = Slots;
