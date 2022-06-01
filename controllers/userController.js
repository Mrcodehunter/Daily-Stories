const Mysql = require("../database/Mysql");
const UserService = require("../services/userService");


const mysqlObject = new Mysql();
const userServiceObject = new UserService(mysqlObject.db.user);

exports.userTable = mysqlObject.db.user;

exports.createUser = (req, res) => {
    userServiceObject.createUser(req,res);
};

exports.getAllUser = (req, res) => {
   userServiceObject.getAllUser(req,res);
};

exports.getUser = (req, res) => {
   userServiceObject.getUser(req,res);
};

exports.updateUser = (req, res) => {
   userServiceObject.updateUser(req,res);
};

exports.deleteUser = (req, res) => {
   userServiceObject.deleteUser(req,res);
};
