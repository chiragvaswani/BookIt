const booking = require("./booking.mongo");
const courtsDatabase = require("./court.mongo");

// Returns 1 if the booking was made. -1 otherwise
async function createBooking(username, date, courtName, slot, cost) {
  court = await findCourt(courtName);
  if (isBooked(date, courtName, slot)) {
    console.error("The slot is unavailable.");
    return -1;
  }
  if (court) {
    const save = await saveBooking(
      username,
      date,
      courtName,
      "abc@xyz.com",
      slot,
      cost
    );
    if (save === -1) {
      console.error("Error saving the booking/");
      return;
    } else {
      console.log("The booking was made successfully.");
      return 1;
    }
  } else {
    console.log("Entered court does not exist");
    return;
  }
}

async function findCourt(courtName) {
  return await courtsDatabase.findOne({ courtName });
}

async function isBooked(date, courtName, slot) {
  const res = await booking.find({
    date: date,
    courtName: courtName,
    slot: slot,
  });
}

async function saveBooking(username, date, courtName, email, slot, cost) {
  try {
    bookingDetails = await new booking({
      username,
      date,
      courtName,
      email,
      slot,
      cost,
    });
    bookingDetails.save();
  } catch (err) {
    console.error(err);
    return -1;
  }
}

module.exports = {
  createBooking,
};
