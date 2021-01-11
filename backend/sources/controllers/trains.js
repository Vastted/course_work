import { trains } from './../services/index.js';

async function create(context) {
    const body = context.request.body;

    context.response.body = await trains.create(body, context.throw);
}

const find = {
    all: async function (context) {
        const body = context.request.body;

        context.response.body = await trains.find.all(body, context.throw);
    },
    byID: async function (context) {
        const parameters = context.request.params;

        context.response.body = await trains.find.byID({ find: parameters }, context.throw);
    },
};

async function update(context) {
    const parameters = context.request.params;
    const body = context.request.body;

    context.response.body = await trains.update({ find: parameters, values: body }, context.throw);
}

async function remove(context) {
    const parameters = context.request.params;

    context.response.body = await trains.remove({ find: parameters }, context.throw);
}

export { create, find, update, remove };
