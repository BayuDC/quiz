const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, done) {
    fastify.addHook('onRequest', (req, reply, done) => {
        req.state = {};

        done();
    });

    done();
});
