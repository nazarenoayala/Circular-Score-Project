import companyDal from "./company.dal.js";
import { generateToken } from '../../utils/jwtUtils.js'

class CompanyController {

  registerCompany = async (req, res) => {
    try {
      const {company_name, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background} = req.body;

      let result = await companyDal.registerCompany([company_name, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background])

      res.status(200).json(result)

    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  }
 
  // editCompany = async (req, res) => {
  //    try {
  //      const {company_name, company_type}
  //    } catch (error) {
      
  //    }
  // }


  //pedir datos de localidades y provincias

  locality = async(req, res)=>{
    try{
      let result = await companyDal.locality();
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json(error);
      
    }
  }
  Province = async(req, res)=>{
    try{
      let result = await companyDal.Province();
      res.status(200).json(result);
    }catch(error){
      console.log(error);
      res.status(500).json(error);
      
    }
  }
}

export default new CompanyController()