const handler = require('../handlers/auth');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/auth', {
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: (req, reply) => {
            const user = req.state.user;

            reply.send({ user });
        },
    });
    fastify.post('/auth/login', {
        preHandler: fastify.auth([fastify.verifyCredentials]),
        handler: handler.login,
    });
    fastify.post('/auth/logout', {
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: handler.logout,
    });

    done();
};
