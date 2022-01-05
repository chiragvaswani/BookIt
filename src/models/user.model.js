const bcrypt = require("bcrypt");

// For user sign up
async function createUser(username, password) {
  if (!((await findUser(username)) === null)) {
    return res.status(406).json({
      error: "Username already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      username,
      password: hashedPassword,
    };
    await createUser(data);
    return data.username;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

// For user sign in
async function signInUser() {
  username, password;
}
