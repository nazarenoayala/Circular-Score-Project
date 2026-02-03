import express from 'express';
import testController from './test.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImage } from '../../middlewares/multer.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

//Ruta de creacion de Test desde Admin

routes.post('/createTest', verifyToken, uploadImage('test'), testController.createTest)

// Ruta para deshabilitar test:
routes.put('/disableTest/:id', testController.disableTest);

// Ruta para habilitar Test:
routes.put('/enableTest/:id', testController.enableTest)

export default routes;

