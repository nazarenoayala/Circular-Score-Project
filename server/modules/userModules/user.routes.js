import express from 'express';
import userController from './user.controller.js';
import { validateUserRegister } from '../../middlewares/validateUserRegister.js';
import { registerSchema } from '../../schemas/userRegister.js';

const routes = express.Router();

// Ruta de registro de usuario
routes.post('/register', validateUserRegister(registerSchema), userController.register);

routes.get('/login', userController.login)

export default routes;