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

  createQuestion = async(values)=>{
    try {
      let sql = 'INSERT INTO question (question_text, premium) VALUES (?,?)'
      let result = await executeQuery(sql, values)
    } catch (error) {
      throw error
    }
  }
}

export default new QuestionDal();