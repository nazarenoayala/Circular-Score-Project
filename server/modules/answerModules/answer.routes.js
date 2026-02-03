import express from 'express';
import answerController from './answer.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

// Ruta para guardar el test (verifyToken par proteger usuario):
router.post('/saveQuestions/:id/:answerSetId', verifyToken, answerController.saveQuestions);


export default router;