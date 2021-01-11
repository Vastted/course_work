import MongoDB from 'mongodb';

// @ts-ignore
const connection = new MongoDB.MongoClient(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    w: 'majority',
    retryWrites: true,
    retryReads: true,
    poolSize: 10,
    ssl: true,
    noDelay: true,
    keepAlive: 30000, // 30s
    connectTimeoutMS: 30000, // 30s
    socketTimeoutMS: 360000, // 6m
    ha: true,
    secondaryAcceptableLatencyMS: 10,
    acceptableLatencyMS: 10,
    forceServerObjectId: false,
    loggerLevel: 'warn',
    logger: console.error,
});

const db = {
    connection,
    connect: async (...parameters) => await connection.connect(...parameters),
    disconnect: async (...parameters) => await connection.close(...parameters),
    get: (collection) => connection.db('v1').collection(collection),
};

export { db };
