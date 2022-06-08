/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const UserService = require('../services/userService');
const mysqlObject = require('../database/driver');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const responseHandler = require('../utils/responseHandler');
const tokenHandler = require('../utils/tokenHandler');

const userServiceObject = new UserService(mysqlObject.db.user);

exports.createUser = catchAsync(async (req, res, next) => {
  const data = await userServiceObject.createUser(req.body);
  const token = await tokenHandler.createToken(data.id, data.name);
  data.dataValues.token = token;
  responseHandler(req, res, 201, data, 'New user created', 'success');
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await userServiceObject.getAllUser();

  responseHandler(req, res, 200, users, 'send all users', 'success');
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userServiceObject.getUser(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  responseHandler(req, res, 200, user, 'send the user', 'success');
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userServiceObject.updateUser(req.body, req.params.id);

  if (!user[0]) return next(new AppError('No user found with that ID', 404));

  const data = await userServiceObject.getUser(req.params.id);

  const token = await tokenHandler.createToken(data.id, data.name);
  data.dataValues.token = token;

  responseHandler(req, res, 200, data, 'user was updated successfully!', 'success');
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await userServiceObject.deleteUser(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  responseHandler(req, res, 204, user, 'user was deleted successfully!', 'success');
});
