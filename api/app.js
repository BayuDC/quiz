const path = require('path');
const Fastify = require('fastify');

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';
const secret = process.env.APP_SECRET;
const origin = process.env.APP_ORIGIN;
const redisUrl = process.env.REDIS_URL;

const fastify = Fastify();

fastify.register(require('@fastify/cors'), {
    origin,
    credentials: true,
});
fastify.register(require('@fastify/view'), {
    engine: { ejs: require('ejs') },
});
fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/sensible'));
fastify.register(require('@fastify/jwt'), { secret });
fastify.register(require('@fastify/redis'), { url: redisUrl });
fastify.register(require('@fastify/websocket'));

fastify.register(require('./plugins/state'));
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/error'));
fastify.register(require('./plugins/data'));

fastify.after(function () {
    fastify.register(require('./routes/auth'), { prefix: '/api' });
    fastify.register(require('./routes/main'), { prefix: '/api' });
    fastify.register(require('./routes/quiz'), { prefix: '/api' });
    fastify.register(require('./routes/adm'));
    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'public'),
    });
});

fastify.listen({ port, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
