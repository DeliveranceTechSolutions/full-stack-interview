module.exports = {
    success: (ctx, arg) => {
        const logger = ctx.wLogger;
        const res = ctx.wRes;
        logger(
            ctx.wReq, 
            ctx.wRes, 
            arg !== undefined 
                ? arg => res.send(msg(arg)) 
                : () => res.send(msg())
        );
    },
    failure: (ctx, branch, err) => {
        const logger = ctx.wLogger;
        const route = ctx.wReq.body.originalUrl
        logger(ctx.wReq, ctx.wRes, () => {
            ctx.wRes.send(`
                Error: 
                ${branch}: 
                Route ${route}: 
                ${err}`);
        });
    }
}