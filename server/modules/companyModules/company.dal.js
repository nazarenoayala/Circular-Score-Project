import { id } from "zod/v4/locales";
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

  // companyByToken = async (id) => {
  //   try {
  //     let sql = 'SELECT user_id, company_name, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background FROM company_data WHERE user_id = ?'

  //     let result = await executeQuery(sql, [id])
  //     console.log(result);

  //     const company = {
  //       user_id: result[0].user_id,
  //       company_name: result[0].company_name,
  //       sector_id: result[0].sector_id,
  //       company_type: result[0].company_type,
  //       legal_form: result[0].legal_form,
  //       active_years: result[0].active_years,
  //       gso: result[0].gso,
  //       client_segment: result[0].sector_id,
  //       stakeholders: result[0].stakeholders,
  //       sustainability: result[0].sustainability,
  //       ods_background: result[0].ods_background,
        
  //     }

  //   } catch (error) {
      
  //   }
  // }
  
    //         result.forEach(e=>{
    //             if(e.travel_id){
    //                 travels.push({
    //                     user_id: e.user_id,
    //                     travel_id: e.travel_id, 
    //                     title: e.title, 
    //                     country: e.country, 
    //                     city: e.city,
    //                     description: e.description
    //                 })
    //             }
    //         } )

    //         return {user, travels};
    //     } catch (error) {
    //         throw error;
    //     }
    // }

  showCompanyProfile = async(id) => {
    try {
      let sql = 'SELECT * FROM company_data WHERE user_id=?'
      return await executeQuery(sql, [id]);

    } catch (error) {
      throw error;
    }
  }


}

export default new CompanyDal();