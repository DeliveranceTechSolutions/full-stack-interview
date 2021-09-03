var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var createRobot = require('../middleware/index');
var getAllRobots = require('../middleware/index');
var getRobotByID = require('../middleware/index');
var modifyRobot = require('../middleware/index');
var deleteRobot = require('../middleware/index');
var results = require('../middleware/index');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/create_robot',  createRobot);
app.use('/get_all_robots', getAllRobots);
app.use('/get_robot_by_id/{id}', getRobotByID);
app.use('/modify_robot', modifyRobot);
app.use('/delete_robot/{id}', deleteRobot);
app.use('/results', results);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
