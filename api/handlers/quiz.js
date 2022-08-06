const prisma = require('../db');

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    index(req, reply) {},
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async start(req, reply) {
        const { user } = req.state;

        if (await this.redis.get(`${user.username}:working`)) {
            reply.badRequest('Quiz already started');
        }

        const questions = await prisma.question.findMany({ select: { id: true } });

        let temp;
        let index;
        let cursor = questions.length;

        while (cursor) {
            index = Math.floor(Math.random() * cursor--);
            temp = questions[cursor];
            questions[cursor] = questions[index];
            questions[index] = temp;
        }

        await this.redis.set(`${user.username}:working`, 1);
        await this.redis.set(`${user.username}:cursor`, 0);
        await this.redis.rpush(
            `${user.username}:questions`,
            questions.map(q => q.id)
        );

        reply.send({
            message: 'Quiz started',
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    finish(req, reply) {},
};
