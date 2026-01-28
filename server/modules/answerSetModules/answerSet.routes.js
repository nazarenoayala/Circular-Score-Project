import express from 'express';
import answerSetController from './answerSet.controller.js';

const router = express.Router();

// Ruta para iniciar un nuevo test
// Hay que meter el verifyToken
router.post('/newAnswerSet/:id', answerSetController.startNewAnswerSet);


export default router;