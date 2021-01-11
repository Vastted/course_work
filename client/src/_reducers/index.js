import { combineReducers } from 'redux';

import { alert } from './alert.js';
import { authentication } from './authentication.js';
import { scoreboard } from './scoreboard.js';
import { trains } from './trains.js';
import { stations } from './stations.js';

const rootReducer = combineReducers({
    alert,
    authentication,
    scoreboard,
    trains,
    stations,
});

export default rootReducer;
