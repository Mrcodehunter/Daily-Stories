const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const tokenHandler = require("../utils/tokenHandler");

verifyToken = catchAsync(async(req, res, next) => {
  if (!req.body.token) return next(new AppError("No token provided!", 403));
  const data = await tokenHandler.verifyToken(req.body.token);
  
  req.body.userId = data.id;
  req.body.author = data.name;

  next();

});

module.exports = verifyToken;
