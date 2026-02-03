import express from 'express';
import answerController from './answer.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

// Ruta para guardar el test (verifyToken par proteger usuario):
router.post('/saveQuestions/:id/:answerSetId', verifyToken, answerController.saveQuestions);

//ruta que trae las respuestas guardadas
router.get('/savedAnswers/:answer_set_id', answerController.savedAnswers)

export default router;