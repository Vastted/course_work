import joi from '@hapi/joi';
import { validate } from './../helpers.js';

const common = { UUIDv4: joi.string().trim().guid({ version: 'uuidv4' }).required() };
const parameters = {
    ID: joi.object().keys({ ID: common.UUIDv4 }).required(),
};

// prettier-ignore
const schemas = {
    station: {
        find: {
            byID: { parameters: parameters.ID },
        },
        update: {
            parameters: parameters.ID,
            body: joi.object().keys({
                platforms: joi.array().items(joi.number().min(1).max(30).required()).optional(),
                address: joi.string().trim().min(2).max(256).optional(),
                phones: joi.array().items(joi.object().keys({
                    number: joi.string().trim().min(2).max(32).required(),
                    name: joi.string().trim().min(2).max(128).optional(),
                }).required()).optional(),
                phone_prefix: joi.string().trim().min(2).max(8).optional(),
            }).required(),
        },
    },
    scoreboard: {
        push: {
            body: joi.object().keys({
                trainID: common.UUIDv4,
                platform: joi.number().min(1).max(30).required(),
                arrives: joi.string().trim().min(5).max(5).required(),
                departs: joi.string().trim().min(5).max(5).required(),
                numbering: joi.string().valid('head', 'tail').required(),
            }).required(),
        },
        update: {
            parameters: parameters.ID,
            body: joi.object().keys({
                trainID: common.UUIDv4,
                platform: joi.number().min(1).max(30).optional(),
                arrives: joi.string().trim().min(5).max(5).required(),
                departs: joi.string().trim().min(5).max(5).required(),
                numbering: joi.string().valid('head', 'tail').optional(),
            }).required(),
        },
        remove: { parameters: parameters.ID },
    },
    trains: {
        create: {
            body: joi.object().keys({
                model: joi.string().trim().min(2).max(32).required(),
                number: joi.string().trim().min(2).max(16).required(),
                destination: joi.object().keys({
                    from: joi.string().trim().min(2).max(32).required(),
                    to: joi.string().trim().min(2).max(32).required(),
                    way: joi.number().valid(0, 1).required(),
                }).required(),
            }).required(),
        },
        find: {
            byID: { parameters: parameters.ID },
        },
        update: {
            parameters: parameters.ID,
            body: joi.object().keys({
                model: joi.string().trim().min(2).max(32).optional(),
                number: joi.string().trim().min(2).max(16).optional(),
                destination: joi.object().keys({
                    from: joi.string().trim().min(2).max(32).required(),
                    to: joi.string().trim().min(2).max(32).required(),
                    way: joi.number().valid(0, 1).required(),
                }).optional(),
            }).required(),
        },
        remove: { parameters: parameters.ID },
    },
    users: {
        authentication: {
            body: joi.object().keys({
                username: joi.string().trim().min(3).max(64).required(),
                password: joi.string().trim().min(3).max(32).required(),
            }).required(),
        },
    },
};

const validation = {
    station: {
        find: {
            byID: validate.bind(null, schemas.station.find.byID),
        },
        update: validate.bind(null, schemas.station.update),
    },
    scoreboard: {
        push: validate.bind(null, schemas.scoreboard.push),
        update: validate.bind(null, schemas.scoreboard.update),
        remove: validate.bind(null, schemas.scoreboard.remove),
    },
    trains: {
        create: validate.bind(null, schemas.trains.update),
        find: {
            byID: validate.bind(null, schemas.trains.byID),
        },
        update: validate.bind(null, schemas.trains.update),
        remove: validate.bind(null, schemas.trains.remove),
    },
    users: {
        authentication: validate.bind(null, schemas.users.authentication),
    },
};

export { schemas, validation };
