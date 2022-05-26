const Sequelize = require("sequelize");
const db = require("./server");
const story = db.define("story", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
});
module.exports = story;
