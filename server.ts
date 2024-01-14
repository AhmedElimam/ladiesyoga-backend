import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './Source/config/logging';
import config from './Source/config/config';
import cors from 'cors';
import bookRouter from './Source/routes/book';
import programRouter from './Source/routes/program';
import ContactUSRouter from './Source/routes/ContactUS';
import mongoose from 'mongoose';
const NAMESPACE = 'Server';
const router = express();

/** Cors */

router.use(cors());

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.options('*', cors());
/** Routes go here */
router.use('/ladies-yoga/api/uploads', express.static('uploads'));
router.use('/ladies-yoga/api', bookRouter, programRouter, ContactUSRouter);

/** MVC Builder */
router.set('view engine', 'ejs');
router.get('/ladies-yoga/api/uploads', (req, res) => {
    res.render('index');
});

/** Error handling */
router.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof Error) {
        logging.error(NAMESPACE, error.message, error);

        res.status(500).json({
            message: 'Internal Server Error'
        });
    } else {
        // Handle non-Error types if necessary
        next(error);
    }
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
