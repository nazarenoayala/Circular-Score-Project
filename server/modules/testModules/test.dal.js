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

  disableTest = async (values) => {

    try {

      let sql = 'UPDATE test SET is_public = 0 WHERE test_id = ?;';

      let result = executeQuery(sql, values);
      return result;
      
    } catch (error) {
      throw error;
    }

  }

  enableTest = async (values) => {

    try {

      let sql = 'UPDATE test SET is_public = 1 WHERE test_id = ?;';

      let result = executeQuery(sql, values);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  createTest = async(values) =>{
    
    try {
      //consulta con el insert en la tabla test 
      let sql = 'INSERT INTO test (test_name, test_image, is_public) VALUES (?,?,?)'
      let result = await executeQuery(sql, values);
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new TestDal();