import express from 'express';
import companyController from './company.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const routes = express.Router();

//Registro de Empresa
routes.post('/register/:user_id', verifyToken, companyController.registerCompany);
routes.put('/registerUpdate/:user_id', verifyToken, companyController.registerCompanyInUser);
//pedir datos de localidades y provincias
routes.get('/locality', verifyToken, companyController.locality);
routes.get('/province', verifyToken, companyController.Province);

//poner middleware validación inputs
<<<<<<< HEAD
<<<<<<< HEAD
// Rutas de edición de user/company
 routes.put('/editCompany/:user_id', verifyToken, companyController.editCompany)
 routes.put('/editCompanyInUser/:user_id', verifyToken, companyController.editCompanyInUser);
=======
/*  routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile) */
 routes.put('/editCompanyProfile/:user_id', companyController.editCompanyProfile);
>>>>>>> a998ee850db5f859174b8ef24a005da89cee48bc

=======
 routes.put('/editCompany/:user_id', verifyToken, companyController.editCompany);
 routes.put('/editCompanyInUser/:user_id', verifyToken, companyController.editCompanyInUser);
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021

//probando ruta de todas las empresas.yas
routes.get('/allCompanies', companyController.allCompanies);

//http://localhost:4000/company/oneCompany/user_id
routes.get('/oneCompany/:user_id', companyController.showOneCompany);


//Datos de cada vez que se hizo un test, qué empresa, su sector, fecha y la puntuación del mismo
routes.get('/allCompaniesData/:test_id', companyController.allTestCompaniesData);

export default routes;
