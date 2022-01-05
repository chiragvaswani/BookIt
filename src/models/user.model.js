const bcrypt = require("bcrypt");
const userDatabase = require("./user.mongo");

// For user sign up
async function signUpUser(username, password, isOwner) {
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
      isOwner,
    };
    await createUser(data);
    return data.username;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

async function findUser(username) {
  return await userDatabase.findOne(username);
}

async function createUser(data) {
  const user = await userDatabase.create(data);
  console.log(user);
}

// For user sign in
async function signInUser(username, password) {
  const user = await findUser(username);
  if (password === user.password) return user;
  else {
    console.error("Invalid password");
    return -1;
  }
}
