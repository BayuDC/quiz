const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, done) {
    fastify.setErrorHandler((err, req, reply) => {
        reply.status(err.statusCode || 500);
        reply.send({
            message: err.message || 'Somehting went wrong',
        });
    });

    fastify.setNotFoundHandler((req, reply) => {
        reply.status(404);
        reply.send();
    });

    done();
});
