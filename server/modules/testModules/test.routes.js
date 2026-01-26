import express from 'express';
import testController from './test.controller.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

// Ruta para seleccionar un test:
routes.get('/oneTest/:id', testController.selectOneTest);

// Ruta para deshabilitar test:
routes.put('/disableTest/:id', testController.disableTest);

// Ruta para habilitar Test:
routes.put('/enableTest/:id', testController.enableTest)

// Ruta para la creación de un test:
routes.post('/editTest', testController.editTest);

export default routes;

