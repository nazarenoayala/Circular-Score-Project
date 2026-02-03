import executeQuery from "../../config/db.js";

class QuestionDal {

  getOneTestQuestions = async (values) => {

    try {

      let sql = 'SELECT * FROM question WHERE test_id = ?';

      let result = await executeQuery(sql, values);

      return result;
      
    } catch (error) {
      throw error;
    }
  }

  updateQuestions = async (values) => {

    try {
      
      let sql = `INSERT INTO question (test_id, question_id, question_text, premium) VALUES (?, ?, ?, 1) AS new_row ON DUPLICATE KEY UPDATE question_text = new_row.question_text, premium = new_row.premium;`;

      const result = await executeQuery(sql, values);

      return result;

    } catch (error) {
      throw error;
    }

  } 
}

export default new QuestionDal();