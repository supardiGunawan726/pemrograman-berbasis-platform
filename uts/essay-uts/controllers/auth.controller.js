const {
  getAllUser,
  getUserById,
  login: loginService,
  register: registerService,
} = require("../services/auth.service");

function displayAllUsers(req, res) {
  const users = getAllUser();
  let li = "";

  users.forEach((user) => {
    li += `<li><a href="/users/${user.id}">${user.name}</a></li>`;
  });

  res.setHeader("Content-Type", "text/html");
  res.status(200);

  res.send(`<ul>${li}</ul>`);
}

function displayUser(req, res) {
  const id = req.params.id;
  const user = getUserById(id);

  res.setHeader("Content-Type", "text/html");
  if (user) {
    res.status(200);
    res.send(`
    <ul>
      <li>ID: ${user.id}</li>
      <li>Name: ${user.name}</li>
      <li>Email: ${user.email}</li>
    </ul>
    `);
  } else {
    res.status(404);
    res.send("User tidak ditemukan");
  }
}

function login(req, res) {
  const { email, password } = req.body || {};
  res.setHeader("Content-Type", "text/json");

  if (!email || !password) {
    res.status(400);
    res.json({
      code: 400,
      success: false,
      message: "Email or password is missing",
    });
  }

  const user = loginService(email, password);
  if (user) {
    res.status(200);
    res.json({
      code: 200,
      success: true,
      message: `Successfully logged in with ${email}`,
    });
  } else {
    res.status(401);
    res.json({
      code: 401,
      success: false,
      message: `Email or password is incorrect`,
    });
  }
}

function register(req, res) {
  try {
    const userReqBody = req.body || {};
    res.setHeader("Content-Type", "text/json");

    const user = registerService(userReqBody);
    res.status(201);
    res.json({
      code: 201,
      success: true,
      message: "User successfully created",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400);
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
}

function unknownMethod(url) {
  return function (req, res, next) {
    if (req.url !== url) {
      return next();
    }

    res.setHeader("Content-Type", "text/html");
    res.status(400);
    res.send(`<h1>Halaman tidak dapat diakses dengan method tersebut</h1>`);
  };
}

module.exports = {
  displayAllUsers,
  displayUser,
  login,
  register,
  unknownMethod,
};
