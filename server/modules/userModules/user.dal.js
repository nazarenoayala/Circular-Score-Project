import executeQuery from "../../config/db.js";

class UserDal {

  test = async () => {
    try {
      
      let sql = 'select * from company_data';

      let prueba = await executeQuery(sql);

      return prueba;

    } catch (error) {
      throw error;
    }
  }

}

export default new UserDal();