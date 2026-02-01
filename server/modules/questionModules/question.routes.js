import express from 'express';
import questionController from './question.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

// Ruta para traernos las preguntas de un test
router.get('/getQuestions/:id', questionController.getOneTestQuestions);
//ruta para crear preguntas de un test. 
router.post('/createQuestion/:id', verifyToken, questionController.createQuestion)

export default router;