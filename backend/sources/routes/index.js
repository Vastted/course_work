import Router from '@koa/router';
import { router as station } from './station.js';
import { router as scoreboard } from './scoreboard.js';
import { router as trains } from './trains.js';
import { router as users } from './users.js';

const routes = new Router({ prefix: '/api' })
    .use(station.routes(), station.allowedMethods())
    .use(scoreboard.routes(), scoreboard.allowedMethods())
    .use(trains.routes(), trains.allowedMethods())
    .use(users.routes(), users.allowedMethods());

export { routes };
