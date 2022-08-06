const Fastify = require('fastify');

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';
const secret = process.env.APP_SECRET;
const redisUrl = process.env.REDIS_URL;

const fastify = Fastify();

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/sensible'));
fastify.register(require('@fastify/jwt'), { secret });
fastify.register(require('@fastify/redis'), { url: redisUrl });

fastify.register(require('./plugins/state'));
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/error'));

fastify.after(function () {
    fastify.register(require('./routes/auth'));
    fastify.register(require('./routes/main'));
    fastify.register(require('./routes/quiz'));
});

fastify.listen({ port, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
