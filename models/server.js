const dbConfig = require("../config/mysqlConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
});


(async ()=>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })()



const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.stories=require("./storyModel.js")(sequelize);
module.exports = db;


