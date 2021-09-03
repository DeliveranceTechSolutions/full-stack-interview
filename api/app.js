var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = morgan('combined');
var indexRouter = require('./routes/index');
var createRobot = require('../service/index');
var getAllRobots = require('../service/index');
var getRobotByID = require('../service/index');
var modifyRobot = require('../service/index');
var deleteRobot = require('../service/index');
var results = require('../service/index');

var app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter, logger);
app.use('/create_robot',  createRobot, logger);
app.use('/get_all_robots', getAllRobots, logger);
app.use('/get_robot_by_id/{id}', getRobotByID, logger);
app.use('/modify_robot', modifyRobot, logger);
app.use('/delete_robot/{id}', deleteRobot, logger);
app.use('/results', results, logger);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('view engine', 'react')

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
