import executeQuery from "../../config/db.js";

class CompanyDal {


  registerCompany = async (values) => {

    console.log(values);
    
    try {

      let sql = 'INSERT INTO company_data (user_id, company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let result = await executeQuery(sql, values);
      return result;

    } catch (error) {

      throw error;
      
    }
  }
  //pedir datos de localidades y provincias
  locality = async() => {
    try{
      let sql = 'SELECT * FROM city';
      let result = await executeQuery(sql);
      return result;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
  Province = async() => {
    try{
      let sql = 'SELECT * FROM province';
      let result = await executeQuery(sql);
      return result;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
}

export default new CompanyDal();