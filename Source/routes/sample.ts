import express from 'express';
import controller from '../controllers/sample';

const router = express.Router();

router.get('/pong', controller.sampleHealthCheck);

export = router;
