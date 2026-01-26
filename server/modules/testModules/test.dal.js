import executeQuery from "../../config/db.js";

class TestDal {

  selectAllTest = async () => {

    try {

      // A futuro cambiar is_deleted a 0;
      let sql = 'SELECT * FROM test;'

      let result = await executeQuery(sql);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

}

export default new TestDal();