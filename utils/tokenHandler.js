const jwt = require('jsonwebtoken');

exports.createToken = (id, name) => {
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

exports.verifyToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};
