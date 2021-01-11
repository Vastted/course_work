import { station } from './../services/index.js';

const find = {
    byID: async function (context) {
        const parameters = context.request.params;

        context.response.body = await station.find.byID({ find: parameters }, context.throw);
    },
};

async function update(context) {
    const parameters = context.request.params;
    const body = context.request.body;

    context.response.body = await station.update({ find: parameters, values: body }, context.throw);
}

export { find, update };
