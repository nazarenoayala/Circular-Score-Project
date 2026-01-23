import executeQuery from "../../config/db.js";

class TestDal {

  selectAllTest = async () => {

    try {

      // A futuro cambiar is_deleted a 0;
      let sql = 'SELECT * FROM test WHERE is_public = 1;'

      let result = await executeQuery(sql);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

  selectOneTest = async (value) => {

    try {

      // A futuro cambiar is_deleted a 0;
      let sql = 'SELECT * FROM test WHERE test_id = ? AND is_public = 1';

      let result = await executeQuery(sql, value);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

  disableTest = async (values) => {

    try {

      let sql = 'UPDATE test SET is_public = 1 WHERE test_id = ?'

      let result = executeQuery(sql, values);
      return result;
      
    } catch (error) {
      throw error;
    }

  }

}

export default new TestDal();