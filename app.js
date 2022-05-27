const express = require("express");
const app = express();
app.use(express.json());

//const db = require("./database/mysql");
//db.sync();
const Driver = require("./database/driver");
const Mysql = require("./database/tempMysql");

const obj = new Driver(new Mysql());
obj.createStoryTable("story");
obj.createUserTable("user");
console.log("The table for the User model was just (re)created!");

require("./routes/storyRoutes")(app);
require("./routes/userRoutes")(app);


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
