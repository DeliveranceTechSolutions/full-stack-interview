const flag = require('../constants/index');
const db = require('../database/index');

module.exports = {
    createRobot: ctx => db.updateRobot(ctx, flag.CREATE),
    deleteRobot: ctx => db.updateRobot(ctx, flag.DELETE),
    getRobotByID: ctx => db.getRobotByID(ctx),
    getRobotIdWithName: ctx => db.getRobotIdWithName(ctx),
    modifyRobot: ctx => db.modifyRobot(ctx),
    getAllRobots: ctx => db.indexRobots(ctx),
    createUser: ctx => db.updateUser(ctx, flag.CREATE),
}