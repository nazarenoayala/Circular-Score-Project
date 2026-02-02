import express from 'express';
import userController from './user.controller.js';
import { validateUserRegister } from '../../middlewares/validateUserRegister.js';
import { registerSchema } from '../../schemas/userRegister.js';
import { validateUserLogin } from '../../middlewares/validateUserLogin.js';
import { loginSchema } from '../../schemas/userLogin.js';
import { validateUserEdit } from '../../middlewares/validateUserEdit.js';
import { editSchema } from '../../schemas/userEdit.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyActivateToken } from '../../middlewares/verifyActivateToken.js';

//TODO Hay que añadir el middleware de verifyToken cuando esté 100% correcto a todas las rutas, y corregir la ruta dinámica quitando el user_id, ya que se puede extraer del req al pasar por el middleware 

const routes = express.Router();

// Ruta de registro de usuario
routes.post('/register', validateUserRegister(registerSchema), userController.register);

// Ruta de activación
routes.put('/activateUser/:token/:user_id', verifyActivateToken , userController.activateUser);

// Ruta de recuperación de password
routes.post('/findResetPassword', userController.findResetPassword);

// Ruta reestablecimiento de contraseña
routes.post('/updatePassword/:token/:user_id', verifyActivateToken, userController.updatePassword);

// Ruta de login de usuario
routes.post('/login', validateUserLogin(loginSchema), userController.login);

// Ruta edición datos de usuario
routes.put('/updateProfile', verifyToken, validateUserEdit(editSchema), userController.updateProfile);

// Ruta baneo de usuario
routes.put('/setUserLogicState/:user_id', verifyToken, userController.setUserState);

// Rutas de obtención de datos del user
// Obtener información de perfil de usuario
routes.get('/showUserProfile/:user_id', userController.showUserProfile);

// Traer info dede token
routes.get('/userByToken', verifyToken, userController.userByToken);

// Token y datos de los test del usuario
// Hay que verificar el token con el middleware !!!!
routes.get('/showTestData/:user_id', userController.showTestData);

export default routes;