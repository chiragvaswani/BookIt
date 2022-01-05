const courtsDatabase = require("./court.mongo");
const booking = require("./booking.mongo");
const userDatabase = require("./user.mongo");

async function findCourt(courtName) {
  return await courtsDatabase.findOne({ name: courtName });
}

// Returns 1 if the court was created. -1 otherwise
async function createCourt(name, email, slots) {
  try {
    const user = await userDatabase.findOne({
      username: email,
    });
    console.log(user);
    if (!user.isOwner)
      throw "The current user is not a court owner and hence cannot register a court.";
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
    return await booking.find({
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
