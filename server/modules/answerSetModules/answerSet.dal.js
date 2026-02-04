import executeQuery from "../../config/db.js";

class AnswerSetDal {

  startNewAnswerSet = async (values) => {

    const [userId, test_id, date] = values;
    
    try {
      let sql = 'SELECT answer_set_id FROM answer_set WHERE test_id = ? AND user_id = ? AND completed = 0'

      let result = await executeQuery(sql, [test_id, userId]);

      if (!result[0]) {

        let sql = 'INSERT INTO answer_set (user_id, test_id, test_date) VALUES (?, ?, ?)'

        let result = await executeQuery(sql, values);
        return result;
      }
      else {
        const error = new Error ('No autorizado');
        error.status = 401;
        throw error
      }
      
    } catch (error) {
      throw error;
    }
  }

  getAnswerSet = async (values) => {

    try {

      let sql = 'SELECT answer_set_id FROM answer_set WHERE test_id = ? AND user_id = ? AND completed = 0';
      let result = await executeQuery(sql, values);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  deleteAnswerSet = async (values) => {

    try {

      let sql = 'SELECT * from answer WHERE answer_set_id = ?';

      let result = await executeQuery(sql, values);
      console.log(result);

      if (!result[0]) {
        let sql = 'DELETE FROM answer_set WHERE answer_set_id = ?'
        let result = await executeQuery(sql, values);
        return result;
      }

    } catch (error) {
      throw error;
    }
  }

  finishTest = async (values) => {

    const [answerSetId, user_id] = values;

    try {

      let sql = 'SELECT user_id FROM answer_set WHERE answer_set_id = ?';

      let userId = await executeQuery(sql, [answerSetId]);

      if (userId[0].user_id === user_id) {

        let sql = 'UPDATE answer_set SET completed = 1 WHERE answer_set_id = ?';

        let result = await executeQuery(sql, [answerSetId]);
        return result;

      }
      else {
        const error = new Error('No autorizado');
        error.status = 401;
        throw error;
      }
      
    } catch (error) {
      throw error;
    }

  }

  allAnswersTestByUser = async (values) =>{

    try {
      
      let sql = 'SELECT COUNT (* )AS set_answer_finished FROM answer_set WHERE user_id = ?'
      return await executeQuery(sql,values)

    } catch (error) {
      throw error;
      

    }
  }

}

export default new AnswerSetDal();