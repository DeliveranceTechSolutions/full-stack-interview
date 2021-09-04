const flag = require('../constants/index');
const db = require('../database/index');


const createRobot = ctx => db.updateRobot(ctx, flag.CREATE);
const deleteRobot = ctx => db.updateRobot(ctx, flag.DELETE);
const getRobotByID = ctx => db.getRobotByID(ctx);
const getRobotByName = ctx => db.getRobotByName(ctx);
const modifyRobot = ctx => db.modifyRobot(ctx);
const getAllRobots = ctx => db.indexRobots(ctx);
const results = ctx => {}
const createUser = ctx => db.updateUser(ctx, flag.CREATE);

module.exports = createRobot, createUser, deleteRobot, getAllRobots, getRobotByID, getRobotByName, modifyRobot, results