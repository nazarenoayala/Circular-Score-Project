import express from 'express';
import companyController from './company.controller.js';

const routes = express.Router();

//Conexión de prueba
routes.post('/registerCompany', companyController.registerCompany);
//pedir datos de localidades y provincias
routes.get('/locality', companyController.locality);
routes.get('/province', companyController.Province);


export default routes