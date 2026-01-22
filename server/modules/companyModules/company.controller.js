import companyDal from "./company.dal.js";
import { generateToken } from '../../utils/jwtUtils.js'

class CompanyController {

  registerCompany = async (req, res) => {
    console.log("ENTRA EN registerCompany");
    console.log("BODY:", req.body);
  
    try {
      const {company_name, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background} = req.body;

      let result = await companyDal.registerCompany([company_name, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background])

      res.status(200).json(result)

    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  }

  // companyByToken = async (req, res) => {
  //   const {user_id} = req;
  //   console.log(user_id);

  //   try {
  //     const result = await companyDal.companyByToken(user_id);

  //     res.status(200).json({
  //       message:"ok",
  //       company:result.company
  //     });

  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
    
  // }


  showCompanyProfile = async (req, res) => {
    const {id} = req.params;

    try {
      let [result] = await companyDal.showCompanyProfile(id);
      res.status(200).json({result})

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  //editProfile = async (req, res) => {
  //    try {
  //      const {company_name, company_type}
  //    } catch (error) {
      
  //    }
  // }
}

export default new CompanyController();
