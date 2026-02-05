import executeQuery from '../../config/db.js';
import sql from './statisticsQuerys.js';

class StatisticsDal {

  getAllRecentResults = async (values) => {

    try {

      let result = await executeQuery(sql.allResults, values);
      return result;
      
    } catch (error) {
      throw error;
    }

  }

  getHistoricFromOneTest = async (values) => {


    try {

      let result = await executeQuery(sql.historicOneTest, values);
      return result;
      
    } catch (error) {
      throw error;
    }


  }

  getSectorAvgScore = async (values) => {

    const {sector_id, test_id} = values;

    try {
      
      // Extraemos primero los últimos sets de respuestas completados para las empresas del sector. Las consultas vienen de un .js que trae un objeto con las strings sql
      let resultAswSets = await executeQuery(sql.sectorTestAnswerSets, [sector_id]);
      
      // Devuelve un objeto, por lo que lo pasamos a array, direcamente los valores
      let answerSetArr = [];
      for (let elem of resultAswSets){
        answerSetArr.push(elem.aSet);
      }
      
      // Por cada valor del array, ejecuta la consulta que calcula la puntuación total obtenida en ese set de respuestas 
      const sumAllScores = async (arr) => {
        let total = 0;
        for(let elem of arr){

          // Necesitamos contar las respuestas que ha dado ese usuario en ese set de respuestas concreto
          let rawSql = `SELECT COUNT(answer.user_answer) AS count, answer_set.answer_set_id from answer, answer_set where answer_set.answer_set_id = answer.answer_set_id and answer_set.answer_set_id = ?;`

          let resultCount = await executeQuery(rawSql, [elem]);

          let val = [resultCount[0].count, parseInt(test_id), elem];
          
          let resultScore = await executeQuery(sql.allAnswerSetAvg, val);
          
          total = total + parseInt(resultScore[0].answerSum); 
        }
        return total;
      }
      
      // Ejecuto la función de sumado, con un await ya que es asíncrona.
      const totalAllScores = await sumAllScores(answerSetArr);
      
      // Finalmente dividimos el resultado obtenido entre el número de empresas, lo que nos da la media de puntuación para este test entre empresas del mismo sector.
      const avgTestSectorScore = Math.trunc(totalAllScores / answerSetArr.length);
      return avgTestSectorScore;
    } catch (error) {
      throw error;
    }
  } 

  getGlobalAvgScore = async (values) => {

    const {test_id} = values;
    
    try {
      
      // Extraemos primero los últimos sets de respuestas completados para todas las empresas que hayan completado este test
      let resultAswSets = await executeQuery(sql.globalTestAnswerSets);
      
      let answerSetArr = [];
      for (let elem of resultAswSets){
        answerSetArr.push(elem.aSet);
      }
      
      
      const sumAllScores = async (arr) => {
        let total = 0;
        for(let elem of arr){

          // Necesitamos contar las respuestas que ha dado ese usuario en ese set de respuestas concreto
          let rawSql = `SELECT COUNT(answer.user_answer) AS count, answer_set.answer_set_id from answer, answer_set where answer_set.answer_set_id = answer.answer_set_id and answer_set.answer_set_id = ?;`

          let resultCount = await executeQuery(rawSql, [elem]);

          let val = [resultCount[0].count, parseInt(test_id), elem];

          let resultScore = await executeQuery(sql.allAnswerSetAvg, val);
          total = total + parseInt(resultScore[0].answerSum); 
        }
        return total;
      }
      
      const totalAllScores = await sumAllScores(answerSetArr);
      
      const avgTestGlobalScore = Math.trunc(totalAllScores / answerSetArr.length);
      return avgTestGlobalScore;
    } catch (error) {
      throw error;
    }
  } 

}

export default new StatisticsDal();