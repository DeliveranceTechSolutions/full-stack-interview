const BRANCH = 'Database';
const contextLogger = require('../tools/Logger');

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
    updateRobot: (ctx, flag) => {
        const payload = ctx[1].body
        
        try {
            client.connect(function (err) {
                if (err)
                    throw err;
            });
            if (flag === CREATE) {
                client.query(`
                    INSERT INTO robot_collector 
                    VALUES (
                        ${payload.robot_id},
                        ${payload.user_name},
                        ${payload.robot_name}, 
                        ${payload.color}, 
                        ${payload.attack}, 
                        ${payload.defense}
                    );
                `);
            }
            else if (flag === DELETE) {
                client.query(`
                    DELETE FROM robot_collector 
                    WHERE robot_id = ${payload.robot_id} 
                `);
            } else {
                return console.error("undefined string in updateRobot");
            }
            client.end();
        } catch (error) {
            this.contextLogger.failure(ctx, branch, error)
        }
    },
    modifyRobot: (ctx, payload, flag, robot_id) => {
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
            WHERE robot_id=${robotId};`);
        client.end();
        return;
    },

    indexRobots: ctx => {
        try {
            client.connect(function (err) {
                if (err)
                    throw err;
            });
            client.query(`
                SELECT * FROM robots 
                INNER JOIN users 
                ON (robots.owner_id = users.id);
            `);
            client.end();


        } catch (error) {

        }
    },

    updateUser: (ctx, flag) => {
        try {
            if(flag === CREATE) {
                const queryString = `INSERT INTO users VALUES (${payload.user_name}, ${payload.password}, ${payload.user_id})`
            } else if(flag === DELETE) {
                const queryString = `DELETE FROM users WHERE ${users.user_id} = ${payload.user_id}`
            } else if(flag === UPDATE) {
                const queryString = `
                UPDATE users 
                SET (username = ${payload.user_name},
                    password = ${payload.password},
                    user_id = ${payload.user_id}) 
                WHERE user_id=${user_id};`
            }
            client.connect(function (err) {
                if (err)
                    throw err;
            });
            client.query(queryString);
            client.end();
        } catch (error) {
            console.error(error);
        }
    },

    getRobotIdWithName: ctx => {
        const my = ctx.wReq.body
        try {
            const robot = client.query(`SELECT robot_id FROM robots WHERE robot_name=${my.robot_name}`);

        } catch (error) {
            
        }
    },
    getRobotByID: ctx => {
        const my = ctx.wReq.body
        try {
            robot = client.query(`SELECT * FROM robots WHERE robot_id=${my.robot_id}`);
            contextLogger.success(ctx, robot)
        } catch (error) {

        }
    },
    
}