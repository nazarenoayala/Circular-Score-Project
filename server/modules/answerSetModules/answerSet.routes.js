import express from 'express';
import answerSetController from './answerSet.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

// Ruta para iniciar un nuevo test
router.post('/newAnswerSet/:id', verifyToken, answerSetController.startNewAnswerSet);

// Ruta para seleccionar los answerSet disponibles
router.get('/selectAnswerSet/:id', verifyToken, answerSetController.getAnswerSet);

// Ruta para eliminar un answerSet en caso de que inicie el test y el usuario se haya equivocado y no quisiera continuarlo (cancelar):
router.delete('/deleteAnswerSet/:id', verifyToken, answerSetController.deleteAnswerSet);

// Ruta para finalizar un test
router.put('/finishTest', verifyToken, answerSetController.finishTest);


export default router;