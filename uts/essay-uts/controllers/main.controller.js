function index(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200);

  res.send(`<h1>Ini adalah halaman Beranda</h1>`);
}

function about(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200);

  res.send(`<h1>Ini Tentang Saya</h1>`);
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
  index,
  about,
  unknownMethod,
};
