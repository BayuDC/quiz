const { PrismaClient } = require('@prisma/client');
const users = require('../data/users.json');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: users,
    });
}

main()
    .catch(e => console.log(e))
    .finally(() => prisma.$disconnect());
