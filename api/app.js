const Fastify = require('fastify');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const fastify = Fastify();

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/sensible'));

fastify.register(require('./plugins/state'));
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/error'));

fastify.after(function () {
    fastify.register(require('./routes/auth'));
    fastify.register(require('./routes/main'));
});

fastify.listen({ port, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
