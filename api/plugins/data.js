const fs = require('fs/promises');
const fp = require('fastify-plugin');
const yaml = require('js-yaml');

module.exports = fp(function (fastify, options, done) {
    fastify.addHook('onReady', async () => {
        const quiz = yaml.load(await fs.readFile('./data/quiz.yml'));
        fastify.decorate('data', {
            name: quiz.name,
        });
    });

    done();
});
