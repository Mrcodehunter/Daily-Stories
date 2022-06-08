const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mysqlObject = require('../database/driver');

const userTable = mysqlObject.db.user;

exports.verifySignin = catchAsync(async (req, res, next) => {
  const user = await userTable.findOne({ where: { name: req.body.name } });

  if (!user) return next(new AppError('Invalid username or password!', 400));
  if (!bcrypt.compareSync(req.body.password, user.password)) return next(new AppError('Invalid username or password!', 400));
  return res.status(201).send({
    status: 'success',
    token: jwt.sign({ id: user.id, name: user.name }, 'secret-key-just-a-demo'),
  });
});
