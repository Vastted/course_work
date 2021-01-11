import Router from '@koa/router';
import { validation, trains } from './../controllers/index.js';

const validate = validation.trains;
const router = new Router({ prefix: '/trains' });
router
    // @ts-ignore
    .post('/', validate.create, trains.create)
    .get('/', trains.find.all)
    .get('/:ID/', validate.find.byID, trains.find.byID)
    .patch('/:ID/', validate.update, trains.update)
    .delete('/:ID/', validate.remove, trains.remove);

export { router };
