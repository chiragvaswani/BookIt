const courtsDatabase = require("./court.mongo");

async function findCourt(courtName) {
  return await courtsDatabase.findOne({ courtName });
}

// Returns 1 if the court was created. -1 otherwise
async function createCourt(name, email, slots) {
  try {
    courtDetails = await new courtsDatabase({ name, email, slots });
    await courtDetails.save();
    console.log("Court " + courtDetails + " saved successfully.");
    return 1;
  } catch (err) {
    console.err(err);
    return -1;
  }
}

module.exports = {
  findCourt,
  createCourt,
};
