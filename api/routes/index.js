var express = require('express');
var router = express.Router();

var robotModel = {}
const mw = require('../../middleware');

router.get('/', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  res.send(mw.getAllRobots());
});

router.post('/create_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    robotModel.username = req.body.username;
    robotModel.robot_name = req.body.robot_name;
    robotModel.robot_id = req.body.robot_id;
    mw.createRobot(ctx, logger, robotModel);
    contextLoggerSuccess([logger, req, res], res.send("robot created successfully!"))
  } catch (error) {
    contextLoggerFailure(ctx, error); 
  }
});

router.post('/delete_robot', function (req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    mw.deleteRobot(ctx, logger, req.body.robot_id);
    contextLoggerSuccess([logger, req, res], res.send(`${req.body.robot_name} has been deleted.`))
  } catch (error) {
    contextLoggerFailure(ctx, error);  
  }
});

router.post('/modify_robot', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    const modifiedRobot = mw.modifyRobot(ctx, logger, req.body);
    res.send(modifiedRobot);
    contextLoggerSuccess([logger, req, res], res.send(modifiedRobot))
  } catch (error) {
    contextLoggerFailure(ctx, error);  
  }
});

router.get('/get_all_robots', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robots = mw.getAllRobots(ctx);
    contextLoggerSuccess(ctx, res.send(robots));
  } catch (error) {
    contextLoggerFailure(ctx, error);   
  }
});

router.get('/get_robot_by_id/{id}', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    let robot = undefined;
    let robot_id = undefined;

    if(req.body.robot_id === -1) {
      robot = mw.getRobotByName(ctx, logger, req.body.robot_name);
      robot_id = mw.getRobotByID(ctx, logger, robot.id);
    } else {
      robot_id = mw.getRobotByID(ctx, logger, robot.id);
    }

    contextLoggerSuccess(ctx, res.send(robot_id));
  } catch (error) {
    contextLoggerFailure(ctx, error);  
  }
});

router.get('/get_robot_by_name', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try {
    const robot = mw.getRobotByName(ctx, logger, req.body.robot_name);
    contextLoggerSuccess(ctx, res.send(robot));
  } catch (error) {
    contextLoggerFailure(ctx, error);
  }
});

router.post('/create_user', function(req, res, next) {
  const ctx = contextCreator(logger, req, res);
  try{
    const user = mw.createUser(ctx, logger, req.body);
    contextLoggerSuccess(ctx, res.send("User created successfully!"));
  } catch (error) {
    contextLoggerFailure(ctx, error);
  } 
});

const contextLoggerSuccess = (ctx, msg) => {
  const logger = ctx[0];
  logger(ctx[1], ctx[2], () => msg);
}

contextLoggerFailure = (ctx, err) => {
  const logger = ctx[0];
  logger(ctx[1], ctx[2], () => {
    res.send(`
      Error: 
        Networking: 
          Route /create_user: 
            ${err}`)
  });
}

const contextCreator = (logger, req, res) => {
  return [logger, req, res];
}

module.exports = router;
