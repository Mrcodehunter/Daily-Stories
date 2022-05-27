const Driver = require("../database/driver");
const Mysql = require("../database/tempMysql");

const mysqlObject = new Driver(new Mysql());
mysqlObject.createStoryTable("story");
mysqlObject.createUserTable("user");
module.exports = mysqlObject;