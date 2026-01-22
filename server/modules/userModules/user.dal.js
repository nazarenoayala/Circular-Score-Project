import executeQuery from "../../config/db.js";

class UserDal {

  //Método de registro de usuario en tabla "user", para el registro rápido, solo email y pass hasheada

  register = async (values) => {
    try {
      let sql = `INSERT INTO user (name, user_email, password) VALUES (?,?,?)`;
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }


  //Metodo para buscar el email del user en la base de datos, para validar las credenciales en el login

  findUserByEmail = async (email) => {
    try{
      let sql = 'SELECT user_id, password FROM user WHERE user_email = ? AND is_deleted = 0 AND is_confirmed = 1'
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //Método para traer la info del usuario desde tabla "user"

  showUserProfile = async (user_id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND is_deleted = 0 AND is_confirmed = 1'

      let profileResult = await executeQuery(sql, user_id);
      console.log("Result de traer los datos de este user", profileResult);
      
    } catch (error) {
      throw error;
    }
  } 

  //Método para actualizar la info del usuario de la tabla "user"

  editUser = async (user_id) => {

    try {
      let sql = 'UPDATE user SET name=?, last_name=?, phone_number=?, city_id=?, province_id=?, position=? WHERE user_id=?'
      await executeQuery(sql, user_id);
    } catch (error) {
      throw error;
    }
  }

  banUser = async (user_id) => {

    try {
      let sql = 'UPDATE user SET is_deleted = 1 where user_id = ?'
      await executeQuery(sql, user_id);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();