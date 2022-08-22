const fs = require('fs/promises');
const yaml = require('js-yaml');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const { users, questions } = yaml.load(await fs.readFile('./data/quiz.yml', 'utf-8'));

    await Promise.all(
        users.map(async user => {
            console.log(user);
            await prisma.user.create({
                data: {
                    fullname: user.fullname,
                    username: user.username,
                    password: await bcrypt.hash(user.password, await bcrypt.genSalt()),
                },
            });
        })
    );

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
