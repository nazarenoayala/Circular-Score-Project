import express from 'express';
import answerController from './answer.controller.js';

const router = express.Router();

// Ruta para guardar el test (verifyToken par proteger usuario):
router.post('/saveTest/:id/:answerSetId', answerController.saveTest);

// Ruta para finalizar test (verifyToken)
router.post('/finishTest/:id/:answerSetId', answerController.finishTest);

export default router;