const booking = require("./booking.mongo");
const courtsDatabase = require("./court.mongo");

async function createBooking(username, date, courtName, slot, cost) {
  court = await findCourt(courtName);
  if (court) {
    const save = await saveBooking(
      username,
      date,
      courtName,
      court.email,
      slot,
      cost
    );
  } else {
    console.log("Entered court does not exist");
    return;
  }
  if (save === -1) console.error("Error saving the booking");
  console.log("Booking saved successfully.");
}

async function findCourt(courtName) {
  return await courtsDatabase.findOne({ courtName });
}

async function saveBooking(username, date, courtName, email, slot, cost) {
  try {
    await booking.save({
      username,
      date,
      courtName,
      email,
      slot,
      cost,
    });
  } catch (err) {
    console.error(err);
    return -1;
  }
}

module.exports = {
  createBooking,
};
