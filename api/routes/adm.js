/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/adm', {
        onRequest: fastify.basicAuth,
        handler: async (_, reply) => {
            return reply.view('/views/dashboard.ejs');
        },
    });

    done();
};
