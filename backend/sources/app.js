import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { routes } from './routes/index.js';
import { errors } from './middleware/index.js';

const app = new Koa({ proxy: false });
app.use(errors(app))
    .use(cors({ credentials: false, maxAge: 604_800, optionsSuccessStatus: 204 })) // 60s * 60m * 24h * 7d
    .use(bodyParser({ enableTypes: ['json'], encoding: 'utf-8', jsonLimit: '512kb', strict: true }))
    .use(routes.routes())
    .use(routes.allowedMethods());

export { app };
