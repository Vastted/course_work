import { db } from './../index.js';

(async () => {
    try {
        await db.connect();

        console.log('[stations]:', await db.get('stations').find({}).toArray());
        console.log('\n');
        console.log('[scoreboards]:', await db.get('scoreboards').find({}).toArray());
        console.log('\n');
        console.log('[trains]:', await db.get('trains').find({}).toArray());
        console.log('\n');
        console.log('[tickets]:', await db.get('tickets').find({}).toArray());
    } catch (error) {
        throw error;
    } finally {
        await db.disconnect();
    }
})();
