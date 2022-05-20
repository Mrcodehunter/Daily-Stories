const express = require("express");
const app = express();
//const fs = require("fs");
app.use(express.json());
const db = require("./models/server")
db.sequelize.sync();
console.log("The table for the User model was just (re)created!");
require("./routes/storyRoutes")(app);
require("./routes/userRoutes")(app);
//const stories = JSON.parse(fs.readFileSync(`${__dirname}/data/stories.json`));

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
