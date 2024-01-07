import express from 'express';
import controller from '../controllers/programs';

const router = express.Router();

router.post('/create/program', controller.createProgram);
router.get('/program/:id', controller.getProgramById);
router.get('/programs/all', controller.getAllPrograms);
router.delete('/program/delete/:id', controller.deleteProgram);
router.patch('/program/update/:id', controller.updateProgram);
export = router;
