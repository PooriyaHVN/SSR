
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.disable('x-powered-by');
app.use(express.static(path.resolve(__dirname,'..' , 'client' , 'build')));
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/*', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

require('./connect/databaseConfig.js');

const port = process.env.PORT || 3001;

app.listen(port , ()=>console.log(`Server Running On Port ${ port }`));

module.exports = app;
