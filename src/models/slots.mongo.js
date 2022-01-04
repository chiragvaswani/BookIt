const mongoose = require("mongoose");

const { Schema } = mongoose;

const Slots = new Schema({
  startTime: {
    hours: Number,
    minutes: Number,
  },
  endTime: {
    hours: Number,
    minutes: Number,
  },
});

module.exports = Slots;
