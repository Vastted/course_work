import { jwt, statuses } from './../helpers.js';
import { users } from './../services/index.js';

async function authentication(context) {
    const body = context.request.body;

    const credentials = await users.authentication(body, context.throw);
    const token = jwt.generate(credentials);

    context.response.body = { token };
    context.response.status = statuses.ok;
}

const authorization = {
    administrator: jwt.check.bind(null, 'administrator'),
};

export { authentication, authorization };
