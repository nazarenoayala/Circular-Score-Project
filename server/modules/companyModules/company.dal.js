import executeQuery from "../../config/db.js";

class CompanyDal {
  registerCompany = async (values) => {

    try {

      let sql = 'INSERT INTO company_data (company_name, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let result = await executeQuery(sql, values);
      return result;

    } catch (error) {

      throw error;
      
    }
  }

}

export default new CompanyDal();