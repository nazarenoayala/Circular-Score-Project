import express from 'express';
import companyController from './company.controller.js';

const routes = express.Router();

//Registro de Empresa
routes.post('/register', companyController.registerCompany);
routes.put('/register', companyController.registerCompanyInUser);
//pedir datos de localidades y provincias
routes.get('/locality', companyController.locality);
routes.get('/province', companyController.Province);
// Prueba
routes.get('/test', companyController.test);

//falta insertar middleware validateToken
//http://localhost:4000/company/registerCompany
routes.post('/registerCompany/:user_id', companyController.registerCompany);

/* routes.get('/companyProfilePage/:user_id', companyController.showCompanyProfile); */

//poner middleware validación inputs
/*  routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile) */
 routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile)


export default routes;