import companyDal from './company.dal.js';
import { generateToken } from '../../utils/jwtUtils.js';

class CompanyController {
  registerCompany = async (req, res) => {
    try {
      const { user_id } = req;

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
        ods_background,
      } = req.body;

      let result = await companyDal.registerCompany(
        [
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
          ods_background,
        ],
        [client_segment, stakeholders],
      );

      res.status(200).json({ message: 'register ok', result });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  registerCompanyInUser = async (req, res) => {
    try {
      const { user_id } = req;

      const { name, position, phone_number, city_id, province_id } = req.body;

      let result = await companyDal.registerCompanyInUser([
        name,
        position,
        phone_number,
        city_id,
        province_id,
        user_id,
      ]);
      res.status(200).json({ message: 'register ok', result });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  editCompany = async (req, res) => {
    try {
      const { user_id } = req;

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
        ods_background,
      } = req.body;

      let result = await companyDal.editCompany(
        [
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
          ods_background,
          user_id,
        ],
        [client_segment, stakeholders],
      );

      res.status(200).json({ message: 'update ok', result });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  editCompanyInUser = async (req, res) => {
    try {
      const { user_id } = req;

      const { name, last_name, position, phone_number, city_id, province_id } =
        req.body;

      let result = await companyDal.editCompanyInUser([
        name,
        last_name,
        position,
        phone_number,
        city_id,
        province_id,
        user_id,
      ]);

      res.status(200).json({ message: 'update ok', result });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

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
  };

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

  //controlador de todas las empresas.yas
  allCompanies = async (req, res) => {
    const { id } = req.params;

    try {
      let companyResult = await companyDal.allCompanies([id]);
      res.status(200).json({
        message: 'Información de la empresa',
        companyResult,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  };

  showOneCompany = async (req, res) => {
    try {
      const { user_id } = req.params;

      const companyResult = await companyDal.showOneCompany(user_id);

      res.status(200).json({
        message: `Información obtenida del user_id ${user_id}`,
        company: companyResult[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  allTestCompaniesData = async (req, res) => {
    try {
      const { test_id } = req.params;
      const result = await companyDal.allTestCompaniesData(test_id);
      res.status(200).json({
        message: 'REQ SUCCES',
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  
  allCompanyTests = async(req, res) => {
    try {
      const { user_id } = req.params;
      const result = await companyDal.allCompanyTests([user_id]);
      res.status(200).json({result})
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
}

export default new CompanyController();