import companyDal from "./company.dal.js";

class CompanyController {

  test = async (req, res) => {

    try {
      res.status(200).json('Bien');
    } catch (error) {
      res.status(500).json('Mal');
    }

  }

  registerCompany = async (req, res) => {
    console.log("ENTRA EN registerCompany");
    console.log("BODY:", req.body);
  
    try {
      const {user_id} = req.params;

      const {company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background} = req.body;

      let result = await companyDal.registerCompany([user_id, company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background])

      res.status(200).json(result)

    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  }
 
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

  editCompanyProfile = async (req, res) => {

    
    
    try {
      const {user_id} = req.params;

      const {company_name, sector_id, legal_form, active_years, company_size, gso, stakeholders, sustainability, ods_background} = req.body

      let uptResult = await companyDal.editCompanyProfile([user_id, company_name, sector_id, legal_form, active_years, company_size, gso, stakeholders, sustainability, ods_background]);

      res.status(200).json({
        message: "Actualizado correctamente",
        uptResult
      })

    } catch (error) {
      console.log(error);
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
}


export default new CompanyController();
