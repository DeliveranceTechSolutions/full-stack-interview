var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var logger = morgan('combined');

const branch = "Routing";

var robotModel = {}
const ser = require('../../service/index');
const contextLogger = require('../../tools/Logger');

router.get('/', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  res.send(ser.getAllRobots(ctx));
});

router.post('/create_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  const success = "Robot created successfully!";
  try {  
    ser.createRobot(ctx);
    contextLogger.success(
      ctx,
      success,
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );
  }
});

router.post('/delete_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  const success = `${req.body.robot_name} has been deleted.`
  try {
    ser.deleteRobot()
    contextLogger.success(
      ctx, 
      success,
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    ); 
  }
});

router.post('/modify_robot', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const modifiedRobot = ser.modifyRobot(ctx);
    contextLogger.success(
      ctx,
      modifiedRobot, 
    )
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );  
  }
});

router.get('/get_all_robots', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robots = ser.getAllRobots(ctx);
    contextLogger.success(
      ctx,
      robots, 
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );   
  }
});

router.get('/get_robot_by_id/{id}', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    let robot = undefined;
    let robot_id = undefined;

    if(req.body.robot_id === -1) {
      robot = ser.getRobotIdWithName(ctx);
      robot_id = ser.getRobotByID(ctx);
    } else {
      robot_id = ser.getRobotByID(ctx);
    }
    contextLogger.success(
      ctx,
      robot_id, 
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );
  }
});

router.get('/get_robot_by_name', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robot = ser.getRobotIdWithName(ctx, logger, req.body.robot_name);
    contextLogger.success(
      ctx,
      robot,
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );
  }
});

router.post('/create_user', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const user = ser.createUser(ctx);
    const success = "User created successfully!";
    contextLogger.success(
      ctx,
      success
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      branch, 
      error
    );
  } 
});


const contextCreator = (logger, req, res) => {
  return Object.freeze({wLogger: logger, wReq: req, wRes: res});
}

module.exports = router;
