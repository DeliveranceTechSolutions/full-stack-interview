module.exports = {
    success: (ctx, arg, msg) => {
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
            res.send(`
                Error: 
                ${branch}: 
                Route ${route}: 
                ${err}`);
        });
    }
}