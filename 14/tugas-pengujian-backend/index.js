const web = require("./web");

const PORT = 3000;

web.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
