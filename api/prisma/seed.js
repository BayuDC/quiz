const fs = require('fs/promises');
const yaml = require('js-yaml');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const { users, questions } = yaml.load(await fs.readFile('./data/quiz.yml', 'utf-8'));
    for (let user of users) {
        await prisma.user.create({
            data: {
                fullname: user.fullname,
                username: user.username,
                password: await bcrypt.hash(user.password, await bcrypt.genSalt()),
            },
        });
    }
    for (let question of questions) {
        await prisma.question.create({
            data: {
                body: question.body,
                choices: {
                    create: question.choices,
                },
            },
        });
    }
}

main()
    .catch(e => console.log(e))
    .finally(() => prisma.$disconnect());
