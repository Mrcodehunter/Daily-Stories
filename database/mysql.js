const dbConfig = require("../config/mysqlConfig.js");
const Sequelize = require("sequelize");
const StoryModel = require("../models/storyModel");
const UserModel = require("../models/userModel");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});
(async () => {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {}
db.database=database;
db.story = (new StoryModel(database)).getStoryTable();
db.user = (new UserModel(database)).getUserTable();

class Mysql {
  constructor() {

    this.db = db;
    database.sync();
    
  }
}

module.exports = Mysql;
//exports.database=database;