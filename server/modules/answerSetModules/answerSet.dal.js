import executeQuery from "../../config/db.js";

class AnswerSetDal {

  startNewAnswerSet = async (values) => {

    let sql = 'INSERT INTO answer_set (user_id, test_id, test_date) VALUES (?, ?, ?)'

    try {

      let result = await executeQuery(sql, values);
      return result;
      
    } catch (error) {
      throw error;
    }

  }

}

export default new AnswerSetDal();