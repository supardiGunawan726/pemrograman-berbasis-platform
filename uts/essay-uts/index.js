const app = require("./app");

// Menggunakan port 3000 karena port 5000 sudah digunakan
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
