import env from 'dotenv-defaults';

const root = process.cwd();
env.config({ path: `${root}/configurations/.env`, defaults: `${root}/configurations/.env.defaults` });

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        // expiresIn: 2_592_000_000, // 1_000ms * 60s * 60m * 24h * 30d
        expiresIn: 315_360_000_000, // 1_000ms * 60s * 60m * 24h * 365d * 10y
        algorithm: 'HS512',
    },
    bcrypt: {
        saltRounds: 8,
    },
    security: {
        layers: {
            administrator: ['administrator', 'user'],
            user: ['user'],
        },
    },
};

export { config };
