import express from 'express';
import userController from './user.controller.js';

const routes = express.Router();

// Conexión de prueba
routes.get('/test', userController.test);
routes.get('/register', userController.register);
routes.get('/login', userController.)

export default routes;