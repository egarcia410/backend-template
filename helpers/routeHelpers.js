const router = require('koa-joi-router');
const Joi = router.Joi;

module.exports = {
    validateBody: (schema) => {
        return async (ctx, next) => {
            const result = Joi.validate(ctx.request.body, schema);
            if (result.error) {
                let errorMessage = result.error.details[0].message
                return ctx.throw(400, errorMessage);
            };
            if (!ctx.request.value) { ctx.request.value = {} };
            ctx.request.value['body'] = result.value;
            await next();
        };
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    }
};