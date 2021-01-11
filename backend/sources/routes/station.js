import Router from '@koa/router';
import { validation, station, users } from './../controllers/index.js';

const validate = validation.station;
const router = new Router({ prefix: '/station' });
router
    // @ts-ignore
    .get('/:ID/', users.authorization['administrator'], validate.find.byID, station.find.byID)
    .patch('/:ID/', users.authorization['administrator'], validate.update, station.update);

export { router };
