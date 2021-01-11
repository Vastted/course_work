import { v4 } from 'uuid';
import { statuses } from './../helpers.js';

const getRequest = (context) => ({
    url: context.request.url,
    method: context.request.method,
    body: { ...context.request.body },
});

function errors(app) {
    app.on('error', (error, context) =>
        console.error('server:errors.internal', {
            ip: context.request.ip,
            error,
            request: getRequest(context),
        }),
    );

    return async function (context, next) {
        try {
            await next();
        } catch (error) {
            context.status = error.statusCode || error.status || statuses.internal_server_error;

            const body = { error: { message: error.message } };
            if (error.transfer) {
                body.error.transfer = error.transfer;
            }

            if (context.status < 500) {
                context.body = body;
            } else {
                const uuid = v4();
                body.error.uuid = error.uuid = uuid;

                context.body = body;
                context.app.emit('error', error, context);
            }
        }
    };
}

export { errors };
