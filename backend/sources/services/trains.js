import { v4 } from 'uuid';
import { db } from './../connections.js';

/**
 * @argument { Object } details
 * @argument { Function } _throw
 * @returns { Promise<{ _id: String }> }
 */
async function create(details, _throw) {
    details._id = v4();
    const created = await db.get('trains').insertOne(details);

    return { _id: created.insertedId };
}

const find = {
    /**
     * @argument { Object } details
     * @argument { Function } _throw
     * @returns { Promise<Object[]> }
     */
    all: async (details, _throw) => await db.get('trains').find({}).toArray(),
    /**
     * @argument { Object } details
     * @argument {{ ID: String }} details.find
     * @argument { Function } _throw
     * @returns { Promise<Object> }
     */
    byID: async (details, _throw) => await db.get('trains').findOne({ _id: details.find.ID }),
};

/**
 * @argument { Object } details
 * @argument {{ ID: String }} details.find
 * @argument { Object } details.values
 * @argument { Function } _throw
 * @returns { Promise<{ status: 'success' }> }
 */
async function update(details, _throw) {
    await db.get('trains').updateOne({ _id: details.find.ID }, { $set: details.values });

    return { status: 'success' };
}

/**
 * @argument { Object } details
 * @argument {{ ID: String }} details.find
 * @argument { Function } _throw
 * @returns { Promise<{ status: 'success' }> }
 */
async function remove(details, _throw) {
    await db.get('trains').deleteOne({ _id: details.find.ID });

    return { status: 'success' };
}

export { create, find, update, remove };
