const express = require("express");
const jwt = require("jsonwebtoken");

const PORT = 3000;
const app = express();
const SECRET_KEY = "RAHASIA_SEKALI_INI";

// MIDDLEWARE UNTUK VERIFIKASI TOKEN
function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak valid." });
  }
}

app.post("/create-token", (req, res) => {
  const user = {
    nama: "Supardi G",
    nim: "20220040084",
    kelas: "TI22H",
  };

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  return res.status(201).json({
    token: token,
  });
});

app.get("/secured-endpoint", verifyToken, (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    user: user,
    message: "Akses diberikan.",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
