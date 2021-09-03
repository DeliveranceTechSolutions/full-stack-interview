var express = require('express');
var router = express.Router();

const BRANCH = "routing";

var robotModel = {}
const ser = require('../../service');
const contextLogger = require('../../tools/Logger');

router.get('/', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  res.send(s.getAllRobots(ctx));
});

router.post('/create_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    robotModel.username = req.body.username;
    robotModel.robot_name = req.body.robot_name;
    robotModel.robot_id = req.body.robot_id;
    ser.createRobot(ctx);
    contextLogger.success(
      ctx, 
      res.send("robot created successfully!")
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      '/create_robot', 
      error
    ); 
  }
});

router.post('/delete_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    ser.deleteRobot(ctx);
    contextLogger.success(
      ctx, 
      res.send(`${req.body.robot_name} has been deleted.`)
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      '/delete_robot', 
      error
    );  
  }
});

router.post('/modify_robot', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    const modifiedRobot = s.modifyRobot(ctx);
    res.send(modifiedRobot);
    contextLogger.success(
      ctx, 
      res.send(modifiedRobot)
    )
  } catch (error) {
    contextLogger.failure(
      ctx, 
      '/modify_robot', 
      error
    );  
  }
});

router.get('/get_all_robots', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robots = s.getAllRobots(ctx);
    contextLoggerSuccess(
      ctx, 
      res.send(robots)
    );
  } catch (error) {
    contextLoggerFailure(
      ctx, 
      '/get_all_robots', 
      error
    );   
  }
});

router.get('/get_robot_by_id/{id}', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    let robot = undefined;
    let robot_id = undefined;

    if(req.body.robot_id === -1) {
      robot = s.getRobotByName(ctx);
      robot_id = s.getRobotByID(ctx);
    } else {
      robot_id = s.getRobotByID(ctx);
    }

    contextLoggerSuccess(
      ctx, 
      res.send(robot_id)
    );
  } catch (error) {
    contextLoggerFailure(
      ctx, 
      '/get_robot_by_id/{id}', 
      error
    );  
  }
});

router.get('/get_robot_by_name', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robot = s.getRobotByName(ctx, logger, req.body.robot_name);
    contextLogger.success(
      ctx,
      robot,
      res.send
    );
  } catch (error) {
    contextLogger.failure(
      ctx, 
      '/get_robot_by_name', 
      error
    );
  }
});

router.post('/create_user', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const user = s.createUser(ctx, logger, req.body);
    return contextLogge.success(
      ctx,
      undefined, 
      res.send("User created successfully!")
    );
  } catch (error) {
    return contextLogger.failure(
      ctx, 
      '/create_user', 
      error
    );
  } 
});

const contextLoggerSuccess = (ctx, arg, msg) => {
  const logger = ctx.wLogger;
  logger(ctx.wReq, ctx.wRes, () => msg);
}

const contextLoggerFailure = (ctx, route, err) => {
  const logger = ctx.wLogger;
  logger(ctx.wRes, ctx.wReq, () => {
    res.send(`
      Error: 
        ${branch}: 
          Route ${route}: 
            ${err}`)
  });
}

const contextCreator = (logger, req, res) => {
  return Object.freeze({wLogger: logger, wReq: req, wRes: res});
}

module.exports = router;
