const prisma = require('../db');
/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/adm', {
        onRequest: fastify.basicAuth,
        handler: async (_, reply) => {
            return reply.view('/views/dashboard.ejs', {
                students: await prisma.user.findMany({
                    include: {
                        answers: {
                            orderBy: { questionId: 'asc' },
                        },
                        score: true,
                    },
                }),
                questions: await prisma.question.findMany(),
            });
        },
    });

    done();
};
