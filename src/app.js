
import Fastify from "fastify";

const envLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                colorize: true
            },
        },
    },
    production: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
            }
        },
    },
    test: false
};

const fastify = Fastify({
    logger: envLogger[process.env.NODE_ENV] ?? true,
});

export {
    fastify as app
};

