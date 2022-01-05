const courtsDatabase = require("./court.mongo");
const booking = require("./booking.mongo");

async function findCourt(courtName) {
  return await courtsDatabase.findOne({ courtName });
}

// Returns 1 if the court was created. -1 otherwise
async function createCourt(name, email, slots) {
  try {
    const existingCourt = await findCourt(name);
    if (existingCourt) throw "Court with this name already exists.";
    courtDetails = await new courtsDatabase({ name, email, slots });
    await courtDetails.save();
    console.log("Court " + courtDetails + " saved successfully.");
    return 1;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

async function getCourtBookings(courtName, email) {
  const court = await findCourt(courtName);
  if (court && court.email === email) {
    return await booking.findOne({
      courtName: courtName,
    });
  } else {
    const message = court
      ? "The given user does not have enough access."
      : "The court does not exist";
    console.error(message);
    return -1;
  }
}

module.exports = {
  findCourt,
  createCourt,
  getCourtBookings,
};
