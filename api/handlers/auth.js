module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async login(req, reply) {
        reply.setCookie('token', req.state.token);
        reply.send({
            message: 'Login success',
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    logout(req) {
        return {};
    },
};
