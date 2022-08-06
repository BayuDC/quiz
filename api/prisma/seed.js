const { PrismaClient } = require('@prisma/client');
const { users, questions } = require('../data/quiz.json');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: users,
    });
    // await prisma.question.createMany({
    //     data: questions.map(question => ({
    //         body: question.body,
    //         choices: {
    //             create: question.choices,
    //         },
    //     })),
    // });

    await Promise.all(
        questions.map(async question => {
            await prisma.question.create({
                data: {
                    body: question.body,
                    choices: {
                        create: question.choices,
                    },
                },
            });
        })
    );
}

main()
    .catch(e => console.log(e))
    .finally(() => prisma.$disconnect());
