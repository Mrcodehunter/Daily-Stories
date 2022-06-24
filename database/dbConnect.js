const { database } = require('./mysql');
// (async () => {
//   try {
//     await database.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();
exports.syncDatabase = () => {
  try {
    database.sync({});
  } catch (err) {
    console.log(err);
  }
};
