import executeQuery, {dbPool} from "../../config/db.js";

class UserDal {

  //Método que trae la información del usuario, y su empresa validando el token desde local storage
  showTestData = async(user_id) => {
    
    try {

      let sql = `SELECT
                    t.test_id,
                    t.test_name,
                    aset.answer_set_id,
                    aset.test_date,
                    aset.completed,
                    q.question_id,
                    q.text AS question_text,
                    a.user_answer
                    FROM answer_set aset
                    JOIN test t
                        ON t.test_id = aset.test_id
                    JOIN answer a
                        ON a.answer_set_id = aset.answer_set_id
                    JOIN question q
                        ON q.test_id = a.test_id
                        AND q.question_id = a.question_id
                    WHERE aset.user_id = ?
                    ORDER BY aset.test_date DESC, aset.answer_set_id, q.question_id`

      let result = await executeQuery(sql, user_id)
      console.log("resultado de la consulta de datos de test", result);
      return result;
    } catch (error) {
      console.log();
      res.status(500).json(error)
    }
  }

  //Método de registro de usuario en tabla "user", para el registro rápido, solo email y pass hasheada

  register = async (values) => {
    try {
      let sql = `INSERT INTO user (user_email, password) VALUES (?,?)`;
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  activateUser = async (user_id) => {
    try {
      let sql = 'UPDATE user SET is_confirmed = 1 WHERE user_id = ?'
      let result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  findResetPassword = async (userEmail) => {
    try {
      
      // Busca el usuario por email para comprobar si existe antes de ofrecer un reset para la password
      let sql = 'SELECT user_id FROM user WHERE user_email = ? AND is_deleted = 0 AND is_confirmed = 1'
      let result = await executeQuery(sql, [userEmail]);
      return result;

    } catch (error) {
      throw error;
    }
  }

  updatePassword = async (values) => {
    try {
      
      let sql = 'UPDATE user SET password = ? WHERE user_id = ?'
      let result = await executeQuery(sql, values);

      return result;

    } catch (error) {
      throw error;
    }
  }


  //Metodo para buscar el email del user en la base de datos, para validar las credenciales en el login

  findUserByEmail = async (user_email) => {
    try{
      let sql = 'SELECT user_id, password FROM user WHERE user_email = ? AND is_deleted = 0 AND is_confirmed = 1'
      let result = await executeQuery(sql, [user_email]);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  userByToken = async (user_id) => {
    
    const connection  = await dbPool.getConnection();
    
    try {
      
      await connection.beginTransaction();

      let sql = `SELECT u.user_id, u.name, u.last_name, u.type, u.phone_number, 
                u.province_id, u.city_id, u.user_email, u.position, u.is_deleted, c.company_name,
                c.company_email, c.sector_id, c.company_type, c.legal_form, 
                c.active_years, c.company_size, c.gso, c.sustainability, c.ods_background
                FROM user u
                LEFT JOIN company_data c ON u.user_id = c.user_id
                WHERE u.user_id = ?`

      // Consulta principal
      let values = [user_id];
      let [result] = await connection.query(sql, values);

      // Consultas secundarias
      sql = `SELECT client_group_id FROM company_client_group WHERE user_id = ?`
      let [ccgResult] = await connection.query(sql, values);
      
      sql = `SELECT stakeholder_id FROM company_stakeholder WHERE user_id = ?`
      let [csResult] = await connection.query(sql, values);
      
      // Ejecutamos la pool de consultas
      await connection.commit();
      
      // Pasamos los result a arrays.
      let ccgResultArr = [];
      let csResultArr = [];
      ccgResult.map((elem)=>{ccgResultArr.push(elem.client_group_id)});
      csResult.map((elem)=>{csResultArr.push(elem.stakeholder_id)});
      
      const userData = {
        user_id: result[0].user_id,
        name: result[0].name,
        last_name: result[0].last_name,
        type: result[0].type,
        phone_number: result[0].phone_number,
        province_id: result[0].province_id,
        city_id: result[0].city_id,
        position: result[0].position,
        is_deleted: result[0].is_deleted
      }

      const companyData = {
        company_name: result[0].company_name,
        company_email: result[0].company_email,
        sector_id: result[0].sector_id, 
        company_type: result[0].company_type, 
        legal_form: result[0].legal_form, 
        active_years: result[0].active_years, 
        company_size: result[0].company_size, 
        gso: result[0].gso, 
        client_segment: ccgResultArr,
        stakeholders: csResultArr,
        sustainability: result[0].sustainability,
        ods_background: result[0].ods_background
      }

      return {userData, companyData};
    } catch (error) {
      throw error;
    } finally {
      if(connection) {
        connection.release();
      }
    }
  }

  //Método para traer la info del usuario desde tabla "user"

  showUserProfile = async (user_id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND is_deleted = 0 AND is_confirmed = 1'

      let profileResult = await executeQuery(sql, user_id);
      
    } catch (error) {
      throw error;
    }
  } 

  //Método para actualizar la info del usuario de la tabla "user"

  updateUserProfile = async (values) => {

    try {
      let sql = 'UPDATE user SET name=?, last_name=?, phone_number=?, city_id=?, province_id=?, position=? WHERE user_id=?'
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }

  updateCompanyProfile = async (values) => {
    
    try {
      let sql = 'UPDATE company_data SET company_name=?, company_email=?, sector_id=?, company_type=? , legal_form=?, active_years=?, company_size=?, gso=?, sustainability=?, ods_background=? WHERE user_id=?'
      await executeQuery(sql, values);
      if(client_segment || stakeholders){
        //TODO Hay que hacer una consulta a parte para los client_segment y los stakeholders, no tengo claro como lo vamos a hacer por que aquí quizá lo lógico sea borrar el anterior registro completo de ambos e insertar de nuevo desde 0.
      }
    } catch (error) {
      throw error;
    }
  }

  setUserState = async (setting, user_id) => {

    // Setea el is_deleted del registro del usuario en 0 o en 1.
    
    try {
      let sql = 'UPDATE user SET is_deleted = ? where user_id = ?'
      await executeQuery(sql, [setting, user_id]);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();