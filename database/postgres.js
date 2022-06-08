// const dbConfig = require("../config/postgresConfig.js");
// const Sequelize = require("sequelize");
// //const Interface = require("./interface");
// class Postgres  {
//     constructor(){
//         this.db = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
//         host : dbConfig.HOST,
//         dialect : dbConfig.dialect,
//     });
//         (async ()=>{
//             try {
//               await this.db.sync();
//               // await this.db.authenticate();
//               console.log('Connection has been established successfully.');
//             } catch (error) {
//               console.error('Unable to connect to the database:', error);
//             }
//           })()
//     }
// }
// module.exports = Postgres;
