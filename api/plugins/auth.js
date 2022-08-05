const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, done) {
    fastify
        .decorate('verifyJWT', function (request, reply, done) {
            throw fastify.httpErrors.unauthorized();

            done();
        })
        .decorate('verifyCredentials', function (request, reply, done) {
            throw fastify.httpErrors.unauthorized();

            done();
        })
        .register(require('@fastify/auth'));
    done();
});
