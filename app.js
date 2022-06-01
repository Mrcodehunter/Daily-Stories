const express = require("express");
const app = express();
app.use(express.json());



const storyRoute = require("./routes/storyRoutes");
const userRoute = require("./routes/userRoutes");

app.use(storyRoute);
app.use(userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
module.exports = app;