import executeQuery from "../../config/db.js";

class CompanyDal {


  registerCompany = async (values) => {
    try{
      let sql = 'INSERT INTO company_data (company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
      let result = await executeQuery(sql, values);
      return result;
    }catch(error){
      throw error
    }
  }
  registerCompanyInUser = async (values) => {
    try{
      let sql = 'UPDATE user SET contact_name = ?, position = ?, phone_number = ?, user_email = ?, city_id = ?, province_id = ? WHERE user_id = ?'
      let result = await executeQuery(sql, values);
      return result;
    }catch(error){
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

  showOneCompany = async(user_id) => {
    try {
      let sql = 'SELECT * FROM company_data LEFT JOIN user ON company_data.user_id = user.user_id WHERE company_data.user_id = ?'

      return await executeQuery(sql, [user_id]);

    } catch (error) {
      throw error;
    }
  }


}

export default new CompanyDal();