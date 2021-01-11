import { db } from './../connections.js';

const find = {
    /**
     * @argument { Object } details
     * @argument {{ ID: String }} details.find
     * @argument { Function } _throw
     * @returns { Promise<Object> }
     */
    byID: async (details, _throw) => await db.get('station').findOne({ _id: details.find.ID }),
};

/**
 * @argument { Object } details
 * @argument {{ ID: String }} details.find
 * @argument { Object } details.values
 * @argument { Function } _throw
 * @returns { Promise<{ status: 'success' }> }
 */
async function update(details, _throw) {
    await db.get('station').updateOne({ _id: details.find.ID }, { $set: details.values });

    return { status: 'success' };
}

export { find, update };
