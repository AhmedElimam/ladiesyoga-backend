import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const MONGO_OPTIONS: ConnectOptions = {
    // Remove the deprecated useNewUrlParser
    // useNewUrlParser: true,
    // Other options...
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'elimam1998';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'qE02wsl4wgB4DS7D';
const MONGO_HOST = process.env.MONGO_URL || 'cluster0.bsbonzi.mongodb.net';

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/test?retryWrites=true&w=majority`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

// Add 'any' type casting here
mongoose
    .connect(MONGO.url, MONGO.options as any)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
