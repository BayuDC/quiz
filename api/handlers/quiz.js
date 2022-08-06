const prisma = require('../db');

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async index(req, reply) {
        const { user } = req.state;

        if (!(await this.redis.get(`${user.username}:working`))) {
            return reply.tooEarly("Quiz hasn't started yet");
        }

        const cursor = await this.redis.get(`${user.username}:cursor`);
        const questionId = await this.redis.lindex(`${user.username}:questions`, cursor);
        const questionCount = await this.redis.llen(`${user.username}:questions`);

        if (cursor == questionCount) return reply.gone('All questions answered');
        const question = await prisma.question.findUnique({
            select: { id: true, body: true, choices: { select: { id: true, body: true } } },
            where: { id: parseInt(questionId) },
        });

        reply.send({
            question,
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async answer(req, reply) {
        const { user } = req.state;
        const { answer: answerId } = req.body;

        if (!(await this.redis.get(`${user.username}:working`))) {
            return reply.tooEarly("Quiz hasn't started yet");
        }

        const cursor = await this.redis.get(`${user.username}:cursor`);
        const questionId = await this.redis.lindex(`${user.username}:questions`, cursor);
        const exist = await prisma.choice.findFirst({
            where: { id: answerId, questionId: parseInt(questionId) },
        });

        if (!exist) return reply.notAcceptable('Ilegal answer');

        await this.redis.incr(`${user.username}:cursor`);
        await this.redis.rpush(`${user.username}:answers`, answerId);

        reply.code(204).send();
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async start(req, reply) {
        const { user } = req.state;

        if (await this.redis.get(`${user.username}:working`)) {
            return reply.badRequest('Quiz already started');
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
