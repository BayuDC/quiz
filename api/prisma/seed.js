const fs = require('fs/promises');
const yaml = require('js-yaml');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const { users, questions } = yaml.load(await fs.readFile('./data/quiz.yml', 'utf-8'));

    await prisma.user.createMany({
        data: users,
    });

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
