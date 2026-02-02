import companyDal from './company.dal.js';
import { generateToken } from '../../utils/jwtUtils.js';


class CompanyController {

  registerCompany = async (req, res) => {
    
    try {

      let {user_id} = req;
      user_id = parseInt(user_id);
      
      const {
        company_name,
        company_email,
        sector_id,
        company_type,
        legal_form,
        active_years,
        company_size,
        gso,
        client_segment,
        stakeholders,
        sustainability,
        ods_background
      } = req.body;

      let result = await companyDal.registerCompany([
        user_id,
        company_name,
        company_email,
        sector_id,
        company_type,
        legal_form,
        active_years,
        company_size,
        gso,
        user_id,
        user_id,
        sustainability,
        ods_background
      ], 
      [
        client_segment,
        stakeholders
      ]);

      res.status(200).json({message:'register ok', result});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  registerCompanyInUser = async (req, res) => {
    try {
      const { user_id } = req.params; 

      const {contact_name, last_name, position, phone_number, city_id, province_id} = req.body;

      let result = await companyDal.registerCompanyInUser([
      name, last_name, position, phone_number, city_id, province_id, user_id
      ]);
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
      res.status(200).json({message: 'register ok', result});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  editCompany = async (req, res) => {
<<<<<<< HEAD
    console.log('eeeeeeeeeeeeeeeeeeeeeeee', req.body);

    try {
      let {user_id} = req.params;
      user_id = parseInt(user_id);
      
=======
    try {
      
      const {user_id} = req;

>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
      const {
        company_name,
        company_email,
        sector_id,
        company_type,
        legal_form,
        active_years,
        company_size,
        gso,
        client_segment,
        stakeholders,
        sustainability,
        ods_background
      } = req.body;

<<<<<<< HEAD
      let uptResult = await companyDal.editCompany([
        user_id,
=======
      let result = await companyDal.editCompany([
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
        company_name,
        company_email,
        sector_id,
        company_type,
        legal_form,
        active_years,
        company_size,
        gso,
<<<<<<< HEAD
        client_segment,
        stakeholders,
        sustainability,
        ods_background
      ]);

      res.status(200).json({
        message: "Actualizado correctamente",
        uptResult
      })

=======
        user_id,
        user_id,
        sustainability,
        ods_background,
        user_id
      ], 
      [
        client_segment,
        stakeholders
      ]);

      res.status(200).json({message:'update ok', result});
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
<<<<<<< HEAD
  };
=======
  }
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021

  editCompanyInUser = async (req, res) => {
    try {
      const {user_id} = req.params;

      const {contact_name, last_name, position, phone_number, city_id, province_id} = req.body;
      
      let result = await companyDal.editCompanyInUser([name, last_name, position, phone_number, city_id, province_id, user_id]);

      res.status(200).json({message: 'update ok', result});
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  locality = async (req, res) => {
    try {
      let result = await companyDal.locality();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  Province = async (req, res) => {
    try {
      let result = await companyDal.Province();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  showCompanyProfile = async (req, res) => {
    const { user_id } = req.params;

    try {
      let companyResult = await companyDal.showCompanyProfile([user_id]);
      res.status(200).json({
        message: `Información obtenida del user_id ${user_id}`,
        companyResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  showCompanyProfile = async (req, res) => {
    
    try {
      const {user_id} = req.params;
      const {company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background} = req.body;

      let companyResult = await companyDal.showCompanyProfile([user_id, company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background]);
      
      res.status(200).json({
        message: `Información obtenida del user_id ${user_id}`,
        companyResult})

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  //controlador de todas las empresas.yas
  allCompanies = async (req, res) => {
    const {id} = req.params;

    try {
      let companyResult = await companyDal.allCompanies([id]);
      res.status(200).json({
        message: 'Información de la empresa', companyResult})

    } catch (error) {

      console.log(error)
      
      res.status(500).json(error);
    }
  }

  showOneCompany = async (req, res) => {
    
    try {
      const {user_id} = req.params;

      const companyResult = await companyDal.showOneCompany(user_id);
      
      res.status(200).json({
        message: `Información obtenida del user_id ${user_id}`,
        company: companyResult[0]
      });

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
 
  }

<<<<<<< HEAD



 delLogicCompany = async(req, res) => {
    const {user_id} = req.params;

    try {
      await companyDal.delLogicCompany(user_id);
      res.status(200).json({message: "Empresa deshabilitada"});

    } catch (error) {
      res.status(500).json(error);
    }
  }

<<<<<<< HEAD
  
  
  allTestCompaniesData = async(req, res) => {
=======
 allTestCompaniesData = async(req, res) => {
>>>>>>> a998ee850db5f859174b8ef24a005da89cee48bc
=======
  allTestCompaniesData = async(req, res) => {
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
    try {    
      const { test_id } = req.params;           
      const result = await companyDal.allTestCompaniesData(test_id);    
      res.status(200).json({
        message: "REQ SUCCES",
        result
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
  
}
=======



  }


 



>>>>>>> a998ee850db5f859174b8ef24a005da89cee48bc



export default new CompanyController();
=======
  
}

export default new CompanyController();
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
