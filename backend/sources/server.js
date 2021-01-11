import './config.js';
import { db } from './connections.js';
import { app } from './app.js';

(async function () {
    try {
        await db.connect();
        app.listen(Number(process.env.PORT));

        console.log(`http://localhost:${process.env.PORT}`);
    } catch (error) {
        await db.disconnect();
        throw error;
    }
})();
