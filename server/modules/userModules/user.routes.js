import express from 'express';
import userController from './user.controller.js';
import { validateUserRegister } from '../../middlewares/validateUserRegister.js';
import { registerSchema } from '../../schemas/userRegister.js';
import { validateUserLogin } from '../../middlewares/validateUserLogin.js';
import { loginSchema } from '../../schemas/userLogin.js';
import { validateUserEdit } from '../../middlewares/validateUserEdit.js';
import { editSchema } from '../../schemas/userEdit.js';

const routes = express.Router();

// Prueba
routes.get('/test', validateUserLogin(loginSchema), userController.test);

// Ruta de registro de usuario
routes.post('/register', validateUserRegister(registerSchema), userController.register);

// Ruta de login de usuario
routes.get('/login', validateUserLogin(loginSchema), userController.login);

// Obtener información de usuario
routes.get('/showUserProfile/:user_id', userController.showUserProfile)

// Ruta edición datos de usuario
routes.post('/editUser', validateUserEdit(editSchema), userController.editUser);

export default routes;