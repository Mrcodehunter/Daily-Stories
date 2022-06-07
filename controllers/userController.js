const Mysql = require("../database/Mysql");
const UserService = require("../services/userService");
const mysqlObject = require("../database/driver");

const userServiceObject = new UserService(mysqlObject.db.user);


exports.createUser = (req, res, next) => {
    userServiceObject.createUser(req, res, next);
};

exports.getAllUser = (req, res, next) => {
   userServiceObject.getAllUser(req, res, next);
};

exports.getUser = (req, res, next) => {
   userServiceObject.getUser(req, res, next);
};

exports.updateUser = (req, res, next) => {
   userServiceObject.updateUser(req, res, next);
};

exports.deleteUser = (req, res, next) => {
   userServiceObject.deleteUser(req, res, next);
};
