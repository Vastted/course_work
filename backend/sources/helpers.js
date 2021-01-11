import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

const statuses = {
    continue: 100,
    processing: 102,

    ok: 200,
    created: 201,
    accepted: 202,
    no_content: 204,

    moved_permanently: 301,
    found: 302,
    not_modified: 304,
    temporary_redirect: 307,
    permanent_redirect: 308,

    bad_request: 400,
    unauthorized: 401,
    request_failed: 402,
    forbidden: 403,
    not_found: 404,
    not_acceptable: 406,
    request_timeout: 408,
    conflict: 409,
    gone: 410,
    request_entity_too_large: 413,
    unsupported_media_type: 415,
    teapot: 418,
    unprocessable_entity: 422,
    locked: 423,
    upgrade_required: 426,
    too_many_requests: 429,

    internal_server_error: 500,
    not_implemented: 501,
    bad_gateway: 502,
    service_unavailable: 503,
    gateway_timeout: 504,
};

async function validate(schema, context, next) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        convert: false,
        stripUnknown: { arrays: true, objects: true },
    };

    try {
        if (schema.parameters) {
            context.request.params = await schema.parameters.validateAsync(context.request.params, options);
        }

        if (schema.query) {
            context.request.query = await schema.query.validateAsync(context.request.query, options);
        }

        if (schema.body) {
            context.request.body = await schema.body.validateAsync(context.request.body, options);
        }
    } catch (error) {
        context.throw(statuses.bad_request, error);
    }

    await next();
}

const password = {
    hash: async (password) => await bcrypt.hash(password, config.bcrypt.saltRounds),
    compare: async (password, hash) => await bcrypt.compare(password, hash),
};

const token = {
    generate: (payload) =>
        jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
            algorithm: config.jwt.algorithm,
        }),
    check: async function (role = 'user', context, next) {
        const token = context.request.headers['authorization'].split(' ')[1];

        if (!token) {
            context.response.redirect('/login');
            context.response.body = '401 Unauthorized';
            context.response.status = statuses.unauthorized;
            return true;
        }

        try {
            const payload = jwt.verify(token, config.jwt.secret, {
                algorithms: [config.jwt.algorithm],
                complete: false,
                maxAge: config.jwt.expiresIn, // The maximum allowed age for tokens to still be valid
            });

            if (!config.security.layers[payload.user.role].includes(role)) {
                context.response.redirect('/');
                context.response.body = '403 Forbidden';
                context.response.status = statuses.forbidden;
                return true;
            }

            context.state.payload = payload;
        } catch (error) {
            context.response.redirect('/login');
            context.response.body = '401 Unauthorized';
            context.response.status = statuses.unauthorized;
            return true;
        }

        await next();
    },
};

export { validate, statuses, password, token as jwt };
