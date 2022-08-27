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
            const students = await prisma.user.findMany({
                include: {
                    answers: {
                        orderBy: { questionId: 'asc' },
                    },
                    score: true,
                },
            });

            for (let student of students) {
                const presence = await fastify.redis.get(`${student.username}:presence`);
                const status = await fastify.redis.get(`${student.username}:status`);
                if (presence) {
                    if (status == 'started') {
                        student.status = 'Working';
                    } else {
                        student.status = 'Online';
                    }
                } else {
                    student.status = 'Offline';
                }
            }

            const questions = await prisma.question.findMany();

            return reply.view('/views/dashboard.ejs', {
                students,
                questions,
            });
        },
    });

    done();
};
