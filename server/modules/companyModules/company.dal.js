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
<<<<<<< HEAD
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
=======


  showCompanyProfile = async(user_id) => {
    try {
      let sql = 'SELECT * FROM company_data WHERE user_id=?'

      return await executeQuery(sql, [user_id]);

    } catch (error) {
      throw error;
    }
  }

  editCompanyProfile = async (values) => {
    try {
      let sql = 'UPDATE company_data SET company_name=?, sector_id=?, legal_form=?, active_years=?, company_size=?, gso=?, stakeholders=?, sustainability=?, ods_background=? WHERE user_id=?'

      await executeQuery(sql, values);

    } catch (error) {
      throw error;
    }
  }


>>>>>>> 99c10b0922398b7ba76834ec0ac85412095999e6
}

export default new CompanyDal();