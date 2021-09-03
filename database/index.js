let robotId = -1; 
const CREATE = "create";
const DELETE = "delete";

const { Client } = require('pg');
const client = new Client({
    user: 'roboenthusiast324',
    host: 'localhost',
    database: 'robot_collector',
    password: 'robots',
    port: 5432,
});

module.exports = {
    updateRobot: (payload, flag) => {

        client.connect(function (err) {
            if (err)
                throw err;
        });
        if (flag === CREATE) {
            client.query(`INSERT INTO robot_collector VALUES (
                    ${payload.robot_id},
                    ${payload.user_name},
                    ${payload.robot_name}, 
                    ${payload.color}, 
                    ${payload.attack}, 
                    ${payload.defense})`);
        } else if (flag === DELETE) {
            client.query(`DELETE FROM robot_collector VALUES (
                    ${payload.robot_id},
                    ${payload.user_name},
                    ${payload.robot_name}, 
                    ${payload.color}, 
                    ${payload.attack}, 
                    ${payload.defense})`);
        } else {
            return console.error("undefined string in updateRobot");
        }
        client.end();
},

    modifyRobot: (payload, flag, robot_id) => {
        client.connect(function (err) {
            if (err)
                throw err;
        });

        // Retrieving robot's id
        if (robot_id !== null && robot_id !== undefined)
            robotId = getRobotByID(robot_id);
        else
            robotId = getRobotIdWithName(robot_name);

        client.query(`
            UPDATE robot_collector 
            SET (robot_id = ${robotId},
                username = ${payload.user_name},
                robot_name = ${payload.robot_name}, 
                color = ${payload.color}, 
                attack = ${payload.attack}, 
                defense = ${payload.defense}) 
            WHERE robot_id=${robotId}`);
        client.end();
        return;
    },

    indexRobots: payload => {
        client.connect(function (err) {
            if (err)
                throw err;
        });
        client.query(`
            UPDATE robot_user 
            SET (
                username = ${payload.user_name},
                robot_name = ${payload.password}, 
                color = ${payload.color}, 
                attack = ${payload.attack}, 
                defense = ${payload.defense}) 
            WHERE robot_id=${robotId}`);
        client.end();

        return;
    },

    updateUser: (payload, flag) => {
        client.connect(function (err) {
            if (err)
                throw err;
        });
        client.query(`
            UPDATE robot_user 
            SET (
                username = ${payload.user_name},
                robot_name = ${payload.password}, 
                color = ${payload.color}, 
                attack = ${payload.attack}, 
                defense = ${payload.defense}) 
            WHERE robot_id=${robotId}`);
        client.end();

        return;
    },
    getRobotIdWithName: robot_name => client.query(`SELECT robot_id FROM robots WHERE robot_name=${robot_name}`),
    getRobotByID: robot_id => client.query(`SELECT * FROM robots WHERE robot_id=${robot_id}`)
}