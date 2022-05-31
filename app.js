const express = require("express");
//const cors = require("cors");
const app = express();
app.use(express.json());
//app.use(cors({origin: "http://localhost:3000"}));
console.log("The table for the User model was just (re)created!");

const storyRoute = require("./routes/storyRoutes");
const userRoute = require("./routes/userRoutes");
app.use(storyRoute);
app.use(userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
