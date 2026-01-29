import express from 'express';
import testController from './test.controller.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

//Ruta de creacion de Test desde Admin

routes.post('/createTest', testController.createTest)

// Ruta para deshabilitar test:
//routes.put('/disableTest/:id', testController.disableTest);

// Ruta para habilitar Test:
//routes.put('/enableTest/:id', testController.enableTest)

export default routes;

