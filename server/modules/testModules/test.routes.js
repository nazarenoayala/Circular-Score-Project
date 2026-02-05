import express from 'express';
import testController from './test.controller.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

// Ruta para deshabilitar test:
//routes.put('/disableTest/:id', testController.disableTest);

// Ruta para habilitar Test:
//routes.put('/enableTest/:id', testController.enableTest)

//Ruta para editar titulo/categoría del test
routes.put('/updateName/:id', testController.updateTestName);

export default routes;

