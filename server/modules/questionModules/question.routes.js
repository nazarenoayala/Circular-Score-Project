import express from 'express';
import questionController from './question.controller.js';

const router = express.Router();

// Ruta para traernos las preguntas de un test
router.get('/getQuestions/:id', questionController.getOneTestQuestions);

export default router;