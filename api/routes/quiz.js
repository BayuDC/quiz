const handler = require('../handlers/quiz');
/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.addHook('preHandler', fastify.auth([fastify.verifyJWT]));
    fastify.get('/quiz', {
        handler: handler.index,
    });
    fastify.post('/quiz', {
        schema: { body: { type: 'object', required: ['answer'], properties: { answer: { type: 'number' } } } },
        handler: handler.answer,
    });
    fastify.post('/quiz/start', {
        handler: handler.start,
    });
    fastify.post('/quiz/finish', {
        handler: handler.finish,
    });
    fastify.post('/quiz/result', {
        handler: handler.result,
    });

    done();
};
