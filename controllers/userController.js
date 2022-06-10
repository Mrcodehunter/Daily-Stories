/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const responseHandler = require('../utils/responseHandler');
const tokenHandler = require('../utils/tokenHandler');

const { userServer } = require('../database/driver');

exports.createUser = catchAsync(async (req, res, next) => {
  const data = await userServer.createUser(req.body);
  const token = await tokenHandler.createToken(data.id, data.name);
  data.dataValues.token = token;
  responseHandler(req, res, 201, data, 'New user created', 'success');
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await userServer.getAllUser();

  responseHandler(req, res, 200, users, 'send all users', 'success');
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userServer.getUser(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  responseHandler(req, res, 200, user, 'send the user', 'success');
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userServer.updateUser(req.body, req.params.id);

  if (!user[0]) return next(new AppError('No user found with that ID', 404));

  const data = await userServer.getUser(req.params.id);

  const token = await tokenHandler.createToken(data.id, data.name);
  data.dataValues.token = token;

  responseHandler(req, res, 200, data, 'user was updated successfully!', 'success');
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await userServer.deleteUser(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  responseHandler(req, res, 204, user, null, null);
});
