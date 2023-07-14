
import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});

export {
    fastify as app
};

