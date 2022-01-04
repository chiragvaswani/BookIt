const mongoose = require("mongoose");

mongoose.connection.once("open", () => console.log("MongoDB is connection ready."));

mongoose.connection.on("error", (err) => console.error(err));

async function mongoConnect(connectionURL) {
	await mongoose.connect(connectionURL);
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect
};
