const branch = 'Database';
const contextLogger = require('../tools/Logger');
const flag = require('../constants/index');

let robotId = -1; 
const { Client } = require('pg');
const client = new Client({
    user: 'roboenthusiast324',
    host: 'localhost',
    database: 'robots',
    password: 'robots',
    port: 5432,
});


module.exports = {
    updateRobot: (ctx, subflag) => {
        const my = Object.freeze(ctx.wReq.body);        
        try {
            client.connect(function (err) {
                if (err)throw err;
            });
            if (subflag === flag.CREATE) {
                client.query(`
                    INSERT INTO robots 
                    VALUES (
                        ${my.robot_id},
                        ${my.user_name},
                        ${my.robot_name}, 
                        ${my.color}, 
                        ${my.attack}, 
                        ${my.defense}
                    );
                `);
            }
            else if (subflag === flag.DELETE) {
                client.query(`
                    DELETE FROM robots
                    WHERE robot_id = ${my.robot_id} 
                `);
            } else {
                return console.error("undefined string in updateRobot");
            }
            client.end();
        } catch (error) {
            contextLogger.failure(ctx, branch, error)
        }
    },
    modifyRobot: ctx => {
        const my = Object.freeze(ctx.wReq.body);
        client.connect(function (err) {
            if (err)throw err;
        });

        // Retrieving robot's id
        if (robot_id !== null && robot_id !== undefined)
            robotId = getRobotByID(robot_id);
        else
            robotId = getRobotIdWithName(robot_name);

        client.query(`
            UPDATE robots 
            SET (robot_id = ${robotId},
                username = ${my.user_name},
                robot_name = ${my.robot_name}, 
                color = ${my.color}, 
                attack = ${my.attack}, 
                defense = ${my.defense}) 
            WHERE robot_id=${robotId}`);
        client.end();
        return;
    },
    indexRobots: ctx => {
        try {
            client.connect(function (err) {
                if (err) throw err;
            });
            robots = client.query(`
                SELECT * FROM robots 
                INNER JOIN users 
                ON (robots.owner_id = users.id)
            `);
            client.end();
            contextLogger.success(
                ctx,
                robots
            )
        } catch (error) {
            contextLogger.failure(
                ctx, 
                branch, 
                error
            );
        }
    },
    updateUser: (ctx, flag) => {
        const my = Object.freeze(ctx.wReq.body);
        const success = "User was either created or updated successfully!"

        try {
            const queryString = Object.freeze(queryStringCreator(ctx, flag));
            client.connect(function (err) {
                if (err) throw err;
            });
            client.query(queryString);
            client.end();
            contextLogger.success(
                ctx,
                success
            );
        } catch (error) {
            contextLogger.failure(
                ctx,
                branch,
                error
            )
        }
    },
    getRobotIdWithName: ctx => {
        const my = ctx.wReq.body
        try {
            const robot = client.query(`
                SELECT robot_id 
                FROM robots 
                WHERE robot_name=${my.robot_name}`
            );
        } catch (error) {
            contextLogger.failure(
                ctx,
                branch,
                error
            ) 
        }
    },
    getRobotByID: ctx => {
        const my = ctx.wReq.body
        try {
            robot = client.query(`
                SELECT * 
                FROM robots 
                WHERE robot_id=${my.robot_id}`
            );
            contextLogger.success(
                ctx, 
                robot
            )
        } catch (error) {
            contextLogger.failure(
                ctx,
                branch,
                error
            )
        }
    }, 
}
const queryStringCreator = (ctx, flag) => {
    let queryString = undefined;
    const my = ctx.wReq.body
    if(flag === CREATE) {
        queryString = `
        INSERT INTO 
        users VALUES (${my.user_name}, ${my.password}, ${my.user_id})`
    } else if(flag === DELETE) {
        queryString = `
        DELETE FROM users 
        WHERE user_id = ${my.user_id}`
    } else if(flag === UPDATE) {
        queryString = `
        UPDATE users 
        SET (username = ${my.user_name},
            password = ${my.password},
            user_id = ${my.user_id}) 
        WHERE user_id=${my.user_id}`
    }

    return queryString;
}
