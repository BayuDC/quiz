/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.addHook('preHandler', fastify.auth([fastify.verifyJWT]));
    fastify.get('/quiz', {
        handler: (req, reply) => {
            reply.send();
        },
    });
    fastify.post('/quiz/start', {
        handler: (req, reply) => {
            reply.send();
        },
    });
    fastify.post('/quiz/finish', {
        handler: (req, reply) => {
            reply.send();
        },
    });

    done();
};
