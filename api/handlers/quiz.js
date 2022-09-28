const prisma = require('../db');

function shuffle(array) {
    let temp;
    let index;
    let cursor = array.length;

    while (cursor) {
        index = Math.floor(Math.random() * cursor--);
        temp = array[cursor];
        array[cursor] = array[index];
        array[index] = temp;
    }

    return array;
}

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async index(req, reply) {
        const { user } = req.state;
        const status = await this.redis.get(`${user.username}:status`);

        if (status == 'finished') {
            return reply.gone('Quiz already finished');
        }
        if (status != 'started') {
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

        shuffle(question.choices);

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
        const status = await this.redis.get(`${user.username}:status`);

        if (status != 'started') {
            return reply.tooEarly("Quiz hasn't started yet");
        }
        if (status == 'finished') {
            return reply.gone('Quiz already finished');
        }

        const cursor = await this.redis.get(`${user.username}:cursor`);
        const questionId = await this.redis.lindex(`${user.username}:questions`, cursor);
        const exist = await prisma.choice.findFirst({
            where: { id: answerId, questionId: parseInt(questionId) || 0 },
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
        const status = await this.redis.get(`${user.username}:status`);

        if (status == 'started') {
            return reply.badRequest('Quiz already started');
        }
        if (status == 'finished') {
            return reply.gone('Quiz already finished');
        }

        const questions = shuffle(await prisma.question.findMany({ select: { id: true } }));

        await this.redis.set(`${user.username}:status`, 'started');
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
    async finish(req, reply) {
        const { user } = req.state;
        const status = await this.redis.get(`${user.username}:status`);

        if (!status) {
            return reply.tooEarly("Quiz hasn't started yet");
        }
        if (status == 'finished') {
            return reply.gone('Quiz already finished');
        }

        const userId = (await prisma.user.findUnique({ where: { username: user.username } })).id;
        const questionCount = await prisma.question.count();
        const userQuestions = await this.redis.lrange(`${user.username}:questions`, 0, questionCount - 1);
        const userAnswers = await this.redis.lrange(`${user.username}:answers`, 0, questionCount - 1);
        if (questionCount != userAnswers.length) {
            return reply.tooEarly('Please answer all questions first!');
        }

        let correct = 0;
        for (let i = 0; i < questionCount; i++) {
            const question = await prisma.question.findUnique({
                where: { id: parseInt(userQuestions[i]) },
            });
            const choice = await prisma.choice.findUnique({
                where: { id: parseInt(userAnswers[i]) },
            });

            correct += choice.correct;
            await prisma.answer.create({
                data: {
                    userId,
                    questionId: question.id,
                    choiceId: choice.id,
                    correct: choice.correct,
                },
            });
        }
        const score = (correct * 100) / questionCount;
        await prisma.score.create({
            data: { userId, value: score },
        });
        await this.redis.set(`${user.username}:status`, 'finished');

        reply.send({
            message: 'Quiz finished',
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async result(req, reply) {
        const { user } = req.state;
        const userId = (await prisma.user.findUnique({ where: { username: user.username } })).id;
        const score = await prisma.score.findFirst({
            where: { userId },
        });
        const totalQuestion = await prisma.question.count();
        const correctAnswer = await prisma.answer.count({ where: { correct: true, userId } });

        if (!score) {
            return reply.notFound('Please finish the quiz first!');
        }

        reply.send({
            score: score.value,
            totalQuestion,
            correctAnswer,
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async data(req, reply) {
        reply.send(this.data);
    },
};
