const fp = require('fastify-plugin');
const bcrypt = require('bcryptjs');
const prisma = require('../db');

module.exports = fp(function (fastify, options, done) {
    fastify
        .decorate('verifyJWT', async function (req) {
            const token = req.cookies.token;

            try {
                const payload = fastify.jwt.verify(token);
                req.state.user = payload;
            } catch {
                throw fastify.httpErrors.unauthorized();
            }
        })
        .decorate('verifyCredentials', async function (req) {
            const { username, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { username: username || '' },
            });
            if (!user) throw fastify.httpErrors.notFound('User not found');

            const auth = await bcrypt.compare(password || '', user.password);
            if (!auth) throw fastify.httpErrors.unauthorized('Incorrect password');

            const token = fastify.jwt.sign({
                fullname: user.fullname,
                username: user.username,
            });

            req.state.token = token;
        })
        .register(require('@fastify/auth'));

    fastify.register(require('@fastify/basic-auth'), {
        validate(username, password, req, reply, done) {
            if (username == (process.env.ADM_USERNAME || 'admin') && password == (process.env.ADM_PASSWORD || 'admin'))
                return done();
            reply.status(403).send();
        },
        authenticate: { realm: 'Westeros' },
    });
    done();
});
