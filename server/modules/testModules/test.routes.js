import express from 'express';
import testController from './test.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImage } from '../../middlewares/multer.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

// Ruta para deshabilitar test:
routes.put('/disableTest/:id', verifyToken, testController.disableTest);

// Ruta para habilitar Test:
routes.put('/enableTest/:id', verifyToken, testController.enableTest)

//Ruta para editar titulo/categoría del test
routes.put('/updateName/:id', testController.updateTestName);

//Ruta para la creación de nuevo Test 

routes.post('/createTest', verifyToken, uploadImage('tests'), testController.createTest);

export default routes;

