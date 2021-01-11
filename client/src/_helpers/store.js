import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from '../_reducers/index.js';

const loggerMiddleware = createLogger();
const authentication = JSON.parse(localStorage.getItem('authentication') || '{}');

const store = createStore(reducers, { authentication }, applyMiddleware(thunkMiddleware, loggerMiddleware));
store.subscribe(() => localStorage.setItem('authentication', JSON.stringify(store.getState().authentication || {})));

export { store };
