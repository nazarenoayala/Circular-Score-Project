import express from 'express';
import companyController from './company.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const routes = express.Router();

//Registro de Empresa
routes.post('/register/:user_id', verifyToken, companyController.registerCompany);
routes.put('/registerUpdate', verifyToken, companyController.registerCompanyInUser);
//pedir datos de localidades y provincias
routes.get('/locality', verifyToken, companyController.locality);
routes.get('/province', verifyToken, companyController.Province);
// Prueba
routes.get('/test', companyController.test);

//falta insertar middleware validateToken
//http://localhost:4000/company/registerCompany
routes.post('/registerCompany/:user_id', verifyToken, companyController.registerCompany);

/* routes.get('/companyProfilePage/:user_id', companyController.showCompanyProfile); */

//poner middleware validación inputs
/*  routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile) */
 routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile)
 routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile);
routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile);

//probando ruta de todas las empresas.yas
routes.get('/allCompanies', companyController.allCompanies)

//http://localhost:4000/company/oneCompany/user_id
routes.get('/oneCompany/:user_id', companyController.showOneCompany);

routes.put('/delLogicCompany/:user_id', companyController.delLogicCompany);


export default routes;