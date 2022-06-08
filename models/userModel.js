const Sequelize = require('sequelize');

class UserModel {
  constructor(db) {
    this.user = db.define('user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
      },
    });
  }

  getUserTable() {
    return this.user;
  }
}

module.exports = UserModel;
