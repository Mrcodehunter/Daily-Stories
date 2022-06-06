const Mysql = require("./mysql");
const mysqlObject = new Mysql();
exports.mysqlObject=mysqlObject;
exports.userTable = mysqlObject.db.user;
exports.storyTable = mysqlObject.db.story;
