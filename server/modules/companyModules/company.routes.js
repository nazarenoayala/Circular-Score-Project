import express from 'express';
import companyController from './company.controller.js';

const routes = express.Router();

routes.get

//http://localhost:4000/company/registerCompany
routes.post('/registerCompany', companyController.registerCompany);

routes.get('/CompanyProfilePage', companyController.showCompanyProfile);


export default routes;