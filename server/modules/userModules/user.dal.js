import executeQuery from "../../config/db.js";


class UserDal {
  register = async (values) => {
    try {
      let sql = `INSERT INTO user (user_email, password) VALUES (?,?)`;
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  findUserByEmail = async (email) => {
    try{
      let sql = 'SELECT user_id, password FROM user WHERE user_email = ? AND is_deleted = 0 AND is_confirmed = 1'
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();