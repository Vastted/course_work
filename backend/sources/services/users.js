import { v4 } from 'uuid';
import { db } from './../connections.js';
import { statuses, password } from './../helpers.js';

async function authentication(details, _throw) {
    const user = await db
        .get('users')
        .findOne({ username: details.username }, { projection: { _id: 1, password: 1, role: 1 } });

    if (!user?._id) {
        _throw(statuses.not_found, 'User does not exist');
    }

    if (!(await password.compare(details.password, user.password))) {
        _throw(statuses.unauthorized, 'Incorrect password');
    }

    const _tokenID = v4();
    await db.get('users').updateOne({ _id: user._id }, { $addToSet: { jwt: _tokenID } });

    return { user: { id: user._id, role: user.role }, _tokenID };
}

export { authentication };
