import executeQuery from "../../config/db.js";

class TestDal {

  selectAllTest = async () => {

    try {

      let sql = 'SELECT * FROM test WHERE is_public = 1;'

      let result = await executeQuery(sql);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

  selectOneTest = async (value) => {

    let sql = 'SELECT * FROM test WHERE test_id = ? AND is_public = 1;';

    try {

      let result = await executeQuery(sql, value);

      return result;
      
    } catch (error) {

      throw error;

    }

  }

}

export default new TestDal();