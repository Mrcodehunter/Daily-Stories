const express = require("express");
const app = express();
app.use(express.json());


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const storyRoute = require("./routes/storyRoutes");
const userRoute = require("./routes/userRoutes");

app.use(storyRoute);
app.use(userRoute);
app.all('/*',(req,res,next)=>{
  next(new AppError(`can't find ${req.originalUrl} on this server!`,404));
})
app.use(globalErrorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
module.exports = app;