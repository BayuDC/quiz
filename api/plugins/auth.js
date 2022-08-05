const fp = require('fastify-plugin');
const bcrypt = require('bcryptjs');
const prisma = require('../db');

module.exports = fp(function (fastify, options, done) {
    fastify
        .decorate('verifyJWT', function (req, reply, done) {
            throw fastify.httpErrors.unauthorized();

            done();
        })
        .decorate('verifyCredentials', async function (req) {
            const { username, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { username: username || '' },
            });
            if (!user) fastify.httpErrors.notFound('User not found');

            const auth = await bcrypt.compare(password || '', user.password);
            if (!auth) fastify.httpErrors.unauthorized('Incorrect password');

            const token = fastify.jwt.sign({
                fullname: user.fullname,
                username: user.username,
            });

            req.state.token = token;
        })
        .register(require('@fastify/auth'));
    done();
});
