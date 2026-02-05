import executeQuery, { dbPool } from "../../config/db.js";

class TestDal {

  selectAllTest = async () => {
    
    try {

      // A futuro cambiar is_deleted a 0;
      let sql = 'SELECT * FROM test;';

      let result = await executeQuery(sql);

      return result;
      
    } catch (error) {
      throw error;
    }

  }

  disableTest = async (values) => {

    try {

      let sql = 'UPDATE test SET is_public = 0 WHERE test_id = ? AND is_public = 1';

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

  createTest = async(values1, values2) =>{
    const questions = values2;
    const connection = await dbPool.getConnection()
    try {
      await connection.beginTransaction();
      //Inserción de Test; 
      let sql = 'INSERT INTO test (test_name, test_image, is_public) VALUES (?,?,?)'
      let result = await connection.query(sql, values1);
      console.log(result);

      //rescato el test_id recien creado en la insercio
      const testId = result[0].insertId

      //2ª Insercion de las preguntas 
      let questionId = 0; 

        for(const question of questions){
        const {question_text, premium} = question;
        let sql = 'INSERT INTO question (test_id, question_id, question_text, premium) VALUES (?,?,?,?)'
        questionId++;
        let values = [testId, questionId, question_text, premium];
        await connection.query(sql, values);
      }
      //confirma el guardado en la base de datos 
      await connection.commit();
      return questionId;
    } catch (error) {
      connection.rollback();
      throw error;
    }finally{
      if(connection){
        connection.release(); 
      }
    }
    }
    
    updateTestName = async (values) =>{
      try {
        let sql = 'UPDATE test SET test_name = ? WHERE test_id = ?';
        let result = await executeQuery(sql, values);
        return result;
      } catch (error) {
        throw error;
      }
    }
}

export default new TestDal();