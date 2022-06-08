const express = require('express');

const app = express();
app.use(express.json());

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const storyRoute = require('./routes/storyRoutes');
const userRoute = require('./routes/userRoutes');
require('dotenv').config();

app.use(storyRoute);
app.use(userRoute);
app.all('/*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${process.env.PORT}...`);
});
module.exports = app;
