const dbConfig = require("../config/mysqlConfig.js");
const Sequelize = require("sequelize");

class Mysql {
  constructor() {
    this.db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
    });
    (async () => {
      try {
        await this.db.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
    })();
  }

  createStoryTable(tableName) {
    const newTable = this.db.define(tableName, {
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
    return newTable;
  }

  createUserTable(tableName) {
    const newTable = this.db.define(tableName, {
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

    return newTable;
  }
}

module.exports = Mysql;
