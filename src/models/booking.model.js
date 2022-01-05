const booking = require("./booking.mongo");
const { findCourt } = require("./court.model");
const { findUser } = require("./user.model");

// Returns 1 if the booking was made. -1 otherwise
async function createBooking(username, date, courtName, slot, cost) {
  court = await findCourt(courtName);
  user = await findUser(username);
  console.log(court);
  if (await isBooked(date, courtName, slot)) {
    console.error("The slot is unavailable.");
    return -1;
  }
  if (court && user) {
    const save = await saveBooking(
      username,
      date,
      courtName,
      court.email,
      slot,
      cost
    );
    if (save === -1) {
      console.error("Error saving the booking");
      return;
    } else {
      console.log("The booking was made successfully.");
      return 1;
    }
  } else {
    console.log("Entered court does not exist");
    return -1;
  }
}

async function isBooked(date, courtName, slot) {
  const res = await booking.find({
    date: date,
    courtName: courtName,
    slot: slot,
  });
  console.log(res.length);
  return res.length > 0;
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

async function getBooking(date, courtName, slot) {
  return await booking.findOne({
    date: date,
    courtName: courtName,
    slot: slot,
  });
}

// Cancels the booking. Returns 1 if cancellation was successful. 0 otherwise
async function cancelBooking(username, date, courtName, slot) {
  if (!(await isBooked(date, courtName, slot))) {
    console.log("The slot is not booked");
    return 1;
  } else {
    const bookedSlot = await getBooking(date, courtName, slot);
    if (bookedSlot && bookedSlot.username !== username) {
      console.log("The current user cannot cancel that booking.");
      return -1;
    } else {
      try {
        await booking.findOneAndRemove({
          username: username,
          date: date,
          courtName: courtName,
          slot: slot,
        });
        return 1;
      } catch (err) {
        console.error(err);
        return -1;
      }
    }
  }
}

async function getUserBookings(username) {
  const userBookings = await booking.find({
    username: username,
  });
  return userBookings;
}

module.exports = {
  createBooking,
  cancelBooking,
  getUserBookings,
};
