const { ResponseError } = require("./error");

// middleware.js
function logger(req, _res, next) {
  const method = req.method;
  const host = req.headers.host;
  const path = req.path;

  console.info(`${method} ${host}${path}`);

  next();
}

function error(err, _req, res, next) {
  if (!err) {
    next();
  }

  if (err instanceof ResponseError) {
    res.status(err.code).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: err.message,
      },
    });
  }
}

module.exports = { logger, error };
