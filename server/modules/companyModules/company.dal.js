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

//todas las empresas. esta consulta permite que cada objeto de empresa lleve los datos de la persona de contacto .yas
 allCompanies = async() => {
    try {
     let sql = `
      SELECT 
        c.*, 
        u.name, 
        u.last_name, 
        u.user_email, 
        u.phone_number 
      FROM company_data c
      JOIN user u ON c.user_id = u.user_id
      WHERE u.is_deleted = 0
    `;

      return await executeQuery(sql);

    } catch (error) {
      throw error;
    }
  }
}



export default new CompanyDal();