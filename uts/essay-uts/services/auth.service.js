const users = [
  {
    id: 1,
    name: "Supardi G",
    email: "supardi.g_ti22@nusaputra.ac.id",
    password: "12345678",
  },
];

function register(user) {
  if (!user || !user.name || !user.email || !user.password) {
    throw Error("Request payload not valid");
  }

  const existingUser = getUserByEmail(user.email);
  if (existingUser) {
    throw Error(`Email ${user.email} already exist`);
  }

  return addUser(user);
}

function login(email, password) {
  const user = getUserByEmail(email);
  if (!user) {
    throw Error(`User ${email} not found`);
  }

  return user.password === password ? user : null;
}

function getAllUser() {
  return users;
}

function getUserByEmail(email) {
  const user = users.find((user) => user.email === email);
  return user;
}

function getUserById(id) {
  const user = users.find((user) => user.id.toString() === id);
  return user;
}

function addUser(user) {
  const id = Math.floor(Date.now() * Math.random());

  users.push({ ...user, id });
  return user;
}

module.exports = {
  register,
  login,
  getAllUser,
  getUserByEmail,
  getUserById,
  addUser,
};
