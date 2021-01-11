import { scoreboard } from './../services/index.js';

async function push(context) {
    const body = context.request.body;

    context.response.body = await scoreboard.push(body, context.throw);
}

const find = {
    all: async function (context) {
        const body = context.request.body;

        context.response.body = await scoreboard.find.all(body, context.throw);
    },
};

async function update(context) {
    const parameters = context.request.params;
    const body = context.request.body;

    context.response.body = await scoreboard.update({ find: parameters, values: body }, context.throw);
}

async function remove(context) {
    const parameters = context.request.params;

    context.response.body = await scoreboard.remove({ find: parameters }, context.throw);
}

export { push, find, update, remove };
