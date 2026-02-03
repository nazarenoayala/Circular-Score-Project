import executeQuery from "../../config/db.js";

class AnswerDal {

  saveQuestions = async (data) => {

    console.log(data);
    // Destruscturing de los datos que nos traemos del controller
    let [answerSetId, id, answers, user_id] = data;
    let testData = [answerSetId, id];
    // Convertimos a número los datos del test
    testData = testData.map(Number);
    const [answerSetIdNumber, testId] = testData;

    const values = [];

    const placeHolders = Object.entries(answers).map(([idQuestion, answer]) => {
      values.push(answerSetIdNumber, testId, Number(idQuestion), answer === '' ? null : answer);
      return '(?, ?, ?, ?)';
    })

    try {

      // Comprobamos que el usuario que está haciendo esta petición es el dueño del answer_set_id
      let sql = 'SELECT user_id, completed FROM answer_set WHERE answer_set_id = ?;';

      let result = await executeQuery(sql, [answerSetId]);

      console.log("id sacado del result user_id", user_id, "result executeQuery", result, "answer set", answerSetId);
      
      // Si el usuaario no coincide con el que está haciendo la petición o el test está completado se envía un res.status de unauthorize
      if (user_id !== result[0].user_id || result[0].completed === 1) {
        
        const error = new Error ('No autorizado');
        error.status = 401;
        throw error;

      }

      // En caso de que sí lo sea comprobamos que el testData, array de preguntas con sus respuestas no esté vacío
      else {
        
        let sql = 'SELECT a.question_id, a.user_answer FROM answer as a LEFT JOIN answer_set aset ON aset.answer_set_id = a.answer_set_id AND aset.completed = 0 WHERE a.answer_set_id = ?';

        let result = await executeQuery(sql, [answerSetId]);
  
        // Si está vacío es que el test es nuevo, por lo tanto realizamos un insert de las respuestas
        if (!result.length) {
  
          let sql = `INSERT INTO answer (answer_set_id, test_id, question_id, user_answer) values ${placeHolders.join(',')}`
  
          let result = await executeQuery(sql, values);
          return result;
  
        }

        // En caso de que no esté vacío se realiza un update o insert en función de si la respuesta ha cambiado o de si se ha insertado una respuesta a una nueva pregunta
        else {
          
          const exisitingMap = {}

          for (const r of result) {
            exisitingMap[r.question_id] = r.user_answer;
          }

          for (let i = 0; i < values.length; i += 4) {

            const answerSetId = values[i];
            const testId = values[i + 1];
            const questionId = values[i + 2];
            const userAnswer = values[i + 3];

            if (exisitingMap[questionId] || exisitingMap[questionId] === null) {
              // Si existe una key en existing map que coincida con la questionId entonces se realiza un update

              let sql = 'UPDATE answer SET user_answer = ? WHERE answer_set_id = ? AND test_id = ? AND question_id = ?';

              let values = [userAnswer, answerSetId, testId, questionId];

              await executeQuery(sql, values);
            }

            else {
              // En caso de que no coincida la key de existing map con la question id del front hacemo sun insert

              let sql = 'INSERT INTO answer (answer_set_id, test_id, question_id, user_answer) VALUES (?, ?, ?, ?);'

              let values = [answerSetId, testId, questionId, userAnswer];

              await executeQuery(sql, values);

            }

          }

        }
        
      } 
    } catch (error) {
      throw error;
    }
       
  }

}

export default new AnswerDal();