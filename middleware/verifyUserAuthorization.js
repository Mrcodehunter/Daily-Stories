/* eslint-disable consistent-return */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { mysqlObject } = require('../database/driver');

const userTable = mysqlObject.db.user;
const verifyUserAuthorization = catchAsync(async (req, res, next) => {
  const user = await userTable.findOne({ where: { id: req.params.id } });
  if (!user) return next(new AppError('No user found with that ID', 404));
  if (user.name !== req.body.author)
    return next(new AppError('Unauthorized', 401));
  next();
});
module.exports = verifyUserAuthorization;
