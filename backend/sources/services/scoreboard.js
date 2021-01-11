import { v4 } from 'uuid';
import { db } from './../connections.js';
// TODO: index expire

/**
 * @argument { Object } details
 * @argument { Function } _throw
 * @returns { Promise<Object> }
 */
async function push(details, _throw) {
    details._id = v4();
    const created = await db.get('scoreboard').insertOne(details);

    return await db
        .get('scoreboard')
        .aggregate([
            { $match: { _id: created.insertedId } },

            { $lookup: { from: 'trains', localField: 'trainID', foreignField: '_id', as: 'details' } },
            { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },

            { $project: { 'details._id': 0 } },
            { $unset: ['details._id'] },
        ])
        .toArray()[0];
}

const find = {
    /**
     * @argument { Object } details
     * @argument { Function } _throw
     * @returns { Promise<Object[]> }
     */
    all: async (details, _throw) =>
        await db
            .get('scoreboard')
            .aggregate([
                { $sort: { _createdAt: 1 } },

                { $lookup: { from: 'trains', localField: 'trainID', foreignField: '_id', as: 'details' } },
                { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },

                { $project: { 'details._id': 0 } },
                { $unset: ['details._id'] },
            ])
            .toArray(),
};

/**
 * @argument { Object } details
 * @argument {{ ID: String }} details.find
 * @argument { Object } details.values
 * @argument { Function } _throw
 * @returns { Promise<Object> }
 */
async function update(details, _throw) {
    await db.get('scoreboard').updateOne({ _id: details.find.ID }, { $set: details.values });

    return details.values;
}

/**
 * @argument { Object } details
 * @argument {{ ID: String }} details.find
 * @argument { Function } _throw
 * @returns { Promise<{ status: 'success' }> }
 */
async function remove(details, _throw) {
    await db.get('scoreboard').deleteOne({ _id: details.find.ID });

    return { status: 'success' };
}

export { push, find, update, remove };
