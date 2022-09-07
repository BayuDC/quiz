const handler = require('../handlers/adm');
/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.addHook('onRequest', fastify.basicAuth);
    fastify.get('/adm', {
        handler: handler.pretty,
    });
    fastify.get('/adm/raw', {
        handler: handler.raw,
    });

    done();
};
