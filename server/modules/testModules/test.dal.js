import executeQuery from "../../config/db.js";

class TestDal {

  selectAllTest = async () => {

    try {

      let sql = 'SELECT * FROM test;'

      let result = await executeQuery(sql);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

}

export default new TestDal();