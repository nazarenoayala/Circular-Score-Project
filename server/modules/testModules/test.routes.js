import express from 'express';
import testController from './test.controller.js';

const routes = express.Router();

// Ruta para seleccionar todos los test:
routes.get('/allTest', testController.selectAllTest);

export default routes;