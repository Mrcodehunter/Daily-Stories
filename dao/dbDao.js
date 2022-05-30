const Driver = require("../database/driver");
const Mysql = require("../database/tempMysql");

const dbDaoObject = new Driver(new Mysql());
dbDaoObject.createStoryTable("story");
dbDaoObject.createUserTable("user");
module.exports = dbDaoObject;