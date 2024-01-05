import https from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './Source/config/logging';
import config from './Source/config/config';
import sampleRoutes from './Source/routes/sample';
const NAMESPACE = 'Server';
const router = express();

// Logging the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL-[${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL-[${req.url}], IP - [${req.socket.remoteAddress}]`);
    });
    next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** rules of endPoint  */

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Request-With, Content-Type Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

// Routes
router.use('/sample', sampleRoutes);
// Error handeling

router.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);

    return res.status(404).json({
        message: error.message
    });
});

// Create the Server */

const httpServer = https.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server's Running on ${config.server.hostname}:${config.server.port}`));
