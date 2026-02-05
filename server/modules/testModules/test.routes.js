import express from 'express';
import testController from './test.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

// Ruta para deshabilitar test:
routes.put('/disableTest/:id', verifyToken, testController.disableTest);

// Ruta para habilitar Test:
routes.put('/enableTest/:id', verifyToken, testController.enableTest)

//Ruta para editar titulo/categoría del test
routes.put('/updateName/:id', testController.updateTestName);

export default routes;

