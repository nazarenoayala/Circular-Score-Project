import express from 'express';
import companyController from './company.controller.js';

const routes = express.Router();

//Conexión de prueba
routes.post('/registerCompany', companyController.registerCompany);


export default routes;