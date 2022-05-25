const dbConfig = require("../config/mysqlConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
});
/*

(async ()=>{
    try {
      await sequelize.authenticate({force : true});
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })()

*/

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.stories=require("../models/storyModel.js")(sequelize);
db.users=require("../models/userModel.js")(sequelize);

db.users.hasMany(db.stories);
db.stories.belongsTo(db.users);

db.dataSync =async() => {
  try{
    await sequelize.sync({ alter : true });
    console.log("All models were synchronized successfully.");
  }
  catch(err){
    console.error('Unable to synchronize to the database:', err);
  }
}


module.exports = db;


