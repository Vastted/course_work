import Router from '@koa/router';
import { validation, users } from './../controllers/index.js';

const validate = validation.users;
const router = new Router({ prefix: '/users' });
router
    // @ts-ignore
    .post('/authenticate/', validate.authentication, users.authentication);

export { router };
