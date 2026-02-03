import express from 'express';
import companyController from './company.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const routes = express.Router();

//Registro de Empresa
<<<<<<< HEAD
routes.post('/register', verifyToken, companyController.registerCompany);
routes.put('/registerUpdate', verifyToken, companyController.registerCompanyInUser);
=======
routes.post('/register/:user_id', verifyToken, companyController.registerCompany);
routes.put('/registerUpdate/:user_id', verifyToken, companyController.registerCompanyInUser);
>>>>>>> 380a5e6b6ca39a4843a41693ff47fc24a10a19ee
//pedir datos de localidades y provincias
routes.get('/locality', verifyToken, companyController.locality);
routes.get('/province', verifyToken, companyController.Province);

<<<<<<< HEAD
// Rutas de edición de user/company
=======
//poner middleware validación inputs
>>>>>>> 380a5e6b6ca39a4843a41693ff47fc24a10a19ee
 routes.put('/editCompany', verifyToken, companyController.editCompany);
 routes.put('/editCompanyInUser', verifyToken, companyController.editCompanyInUser);

//probando ruta de todas las empresas.yas
routes.get('/allCompanies', companyController.allCompanies);

//http://localhost:4000/company/oneCompany/user_id
routes.get('/oneCompany/:user_id', companyController.showOneCompany);


//Datos de cada vez que se hizo un test, qué empresa, su sector, fecha y la puntuación del mismo
<<<<<<< HEAD
routes.get('/allCompaniesData/:test_id', companyController.allTestCompaniesData);
=======
routes.get('/allCompanyTests/:user_id', verifyToken, companyController.allCompanyTests);
>>>>>>> 380a5e6b6ca39a4843a41693ff47fc24a10a19ee

export default routes;
