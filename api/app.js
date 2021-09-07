var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = morgan('combined');

var ser = require('../service/index');

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

app.use("/", ser.getAllRobots);
app.use("/create_robot",  ser.createRobot);
app.use('/get_all_robots', ser.getAllRobots);
app.use('/get_robot_by_id/{id}', ser.getRobotByID);
app.use('/modify_robot', ser.modifyRobot);
app.use('/delete_robot/{id}', ser.deleteRobot);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next d of middleware
  next();
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
