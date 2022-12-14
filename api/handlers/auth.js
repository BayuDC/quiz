module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    login(req, reply) {
        reply.setCookie('token', req.state.token, { path: '/' });
        reply.send({
            message: 'Login success',
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    logout(req, reply) {
        reply.clearCookie('token', { path: '/' });
        reply.send({
            message: 'Logout success',
        });
    },
    present(conn, req) {
        const { user } = req.state;
        this.redis.set(`${user.username}:presence`, 1);
        conn.socket.on('close', () => {
            this.redis.del(`${user.username}:presence`);
        });
    },
};
