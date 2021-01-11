import Router from '@koa/router';
import { validation, users, scoreboard } from './../controllers/index.js';

const validate = validation.scoreboard;
const router = new Router({ prefix: '/scoreboard' });
router
    // @ts-ignore
    .post('/', validate.push, scoreboard.push)
    .get('/', scoreboard.find.all)
    .patch('/:ID/', users.authorization['administrator'], validate.update, scoreboard.update)
    .delete('/:ID/', users.authorization['administrator'], validate.remove, scoreboard.remove);

export { router };
