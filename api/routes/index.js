var express = require('express');
var router = express.Router();
var robotModel = {}
const mw = require('../../middleware');

router.get('/', function (req, res, next) {
  res.send('ok!');
});

router.post('/create', function (req, res, next) {
  robotModel.username = req.body.username;
  robotModel.robot_name = req.body.robot_name;
  robotModel.id = req.body.robot_id;

  mw.createRobot(robotModel);
  res.send("robot created successfully!");
});

const createUser = payload => {
  mw.createUser(payload);

  res.send("user created successfully!");
}

router.get('/get_all_robots', function(req, res, next) {
  const robots = mw.getAllRobots()

  res.send(robots)
});

router.get('/get_robot_by_id/{id}', function(req, res, next) {
  const robot_id = mw.getRobotByName(req.body.robot_name);
  const robot = mw.getRobotByID(robot_id);

  res.send(robot)
})

module.exports = router;
