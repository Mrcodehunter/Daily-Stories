const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
verifyToken = (req, res, next) => {
  if (!req.body.token) return next(new AppError("No token provided!", 403));

  jwt.verify(req.body.token, "secret-key-just-a-demo", (err, data) => {
    if (err) return next(new AppError("Unauthorized!", 401));

    req.userId = data.id;
    req.author = data.name;
    next();
  });
};

module.exports = verifyToken;
