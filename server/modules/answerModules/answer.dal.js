import executeQuery from "../../config/db.js";

class AnswerDal {

  saveTest = async (data) => {

    console.log(data);
    // Destruscturing de los datos que nos traemos del controller
    let [answerSetId, id, answers] = data;
    let testData = [answerSetId, id];
    // Convertimos a número los datos del test
    testData = testData.map(Number);
    const [answerSetIdNumber, testId] = testData;


    const values = [];

    const placeHolders = Object.entries(answers).map(([idQuestion, answer]) => {
      values.push(answerSetIdNumber, testId, Number(idQuestion), answer);
      return '(?, ?, ?, ?)';
    })


    try {

      let sql = 'SELECT * FROM answer INNER JOIN answer_set ON answer_set.answer_set_id = answer.answer_set_id WHERE answer_set.completed = 0 AND answer.test_id = ? AND answer.answer_set_id = ?;';

      let result = await executeQuery(sql, testData);
      console.log(result);

      if (result.length === 0) {

        let sql = `INSERT INTO answer (answer_set_id, test_id, question_id, user_answer) values ${placeHolders.join(',')}`

        let result = await executeQuery(sql, values);
        return result;

      }
      else {

        let sql = `UPDATE answer SET `

      }
      
    } catch (error) {
      throw error;
    }

  }

  finishTest = async (values) => {

    try {

      let sql = 'SELECT * FROM answer WHERE user_id = ? AND test_id = ? AND answer_set_id = ? AND completed = 0;';

      let result = await executeQuery(sql, values);

      if (!result.length) {

        let sql = 'INSERT INTO'

      }
      else {



      }
      
    } catch (error) {
      throw error;
    }

  }

}

export default new AnswerDal();