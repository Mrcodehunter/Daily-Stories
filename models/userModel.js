const Sequelize = require("sequelize");
//const db = require("../database/mysql");

class UserModel {
  constructor(db) {
    this.user = db.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
      },
      password: {
        type: Sequelize.STRING,
      },
    });
  }
  getUserTable(){
      return this.user;
  }
}

module.exports = UserModel;
