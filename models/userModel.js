const Sequelize = require("sequelize");

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
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
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
