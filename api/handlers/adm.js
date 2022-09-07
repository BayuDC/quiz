const prisma = require('../db');

const getEverything = async that => {
    const students = await prisma.user.findMany({
        include: {
            answers: {
                orderBy: { questionId: 'asc' },
            },
            score: true,
        },
    });

    for (let student of students) {
        const presence = await that.redis.get(`${student.username}:presence`);
        const status = await that.redis.get(`${student.username}:status`);
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

    return {
        students,
        questions,
    };
};

module.exports = {
    async pretty(_, reply) {
        const data = await getEverything(this);
        return reply.view('views/dashboard.ejs', data);
    },
    async raw(_, reply) {
        const data = await getEverything(this);
        return reply.send(data);
    },
};
