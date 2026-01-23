import express from 'express';
import userController from './user.controller.js';
import { validateUserRegister } from '../../middlewares/validateUserRegister.js';
import { registerSchema } from '../../schemas/userRegister.js';
import { validateUserLogin } from '../../middlewares/validateUserLogin.js';
import { loginSchema } from '../../schemas/userLogin.js';
import { validateUserEdit } from '../../middlewares/validateUserEdit.js';
import { editSchema } from '../../schemas/userEdit.js';

//TODO Hay que añadir el middleware de verifyToken cuando esté 100% correcto a todas las rutas

const routes = express.Router();

// Ruta de registro de usuario
routes.post('/register', validateUserRegister(registerSchema), userController.register);

// Ruta de login de usuario
routes.post('/login', validateUserLogin(loginSchema), userController.login);

// Ruta edición datos de usuario
routes.post('/editUser', validateUserEdit(editSchema), userController.editUser);

// Ruta baneo de usuario
routes.put('/banUser/:user_id', userController.banUser);

// Rutas de obtención de datos del user
// Obtener información de perfil de usuario
routes.get('/showUserProfile/:user_id', userController.showUserProfile);

// Traer info dede token
routes.get('/userByToken', userController.userByToken);

// Token y datos de los test del usuario
// Hay que verificar el token con el middleware !!!!
routes.get('/showTestData/:user_id', userController.showTestData);

export default routes;