const sql = {
  
  // consulta para obtener los resultados más recientes de cada test ODS por EMPRESA
  allResults: 'SELECT t.test_id, COALESCE(SUM(a.user_answer), 0) AS result, COUNT(a.user_answer) AS total, CASE WHEN COUNT(a.user_answer) = 0 THEN 0 ELSE (SUM(a.user_answer) / (COUNT(a.user_answer) * 5)) * 100 END AS resultTotal FROM test t LEFT JOIN user u ON u.user_id = ? LEFT JOIN answer_set ans_set ON ans_set.test_id = t.test_id AND ans_set.user_id = u.user_id AND ans_set.completed = 1 AND ans_set.test_date = (SELECT MAX(a2.test_date) FROM answer_set a2 WHERE a2.test_id = t.test_id AND a2.user_id = u.user_id AND a2.completed = 1) LEFT JOIN answer a ON a.answer_set_id = ans_set.answer_set_id GROUP BY t.test_id;'
,
  // Consulta para traernos todos los test de una ODS realizados por una empresa (rescatamos id de empresa de token y id de test del req.params)
  historicOneTest: 'SELECT test.test_id, answer_set.test_date, COALESCE(SUM(answer.user_answer), 0) AS result, COUNT(answer.user_answer) AS total_answers, CASE WHEN COUNT(answer.user_answer) = 0 THEN 0 ELSE (SUM(answer.user_answer) / (COUNT(answer.user_answer) * 5.0)) * 100 END AS result_total, answer_set.completed FROM test LEFT JOIN answer_set ON answer_set.test_id = test.test_id AND answer_set.user_id = ? LEFT JOIN answer ON answer.answer_set_id = answer_set.answer_set_id WHERE test.test_id = ? GROUP BY test.test_id, answer_set.test_date, answer_set.completed, answer_set.answer_set_id ORDER BY answer_set.test_date DESC;',

  // Consulta para traernos el último resultado de un test id concreto para un usuario
  lastResultOneTest: 'SELECT t.test_id, COALESCE(SUM(a.user_answer), 0) AS result, COUNT(a.user_answer) AS total, CASE WHEN COUNT(a.user_answer) = 0 THEN 0 ELSE (SUM(a.user_answer) / (COUNT(a.user_answer) * 5)) * 100 END AS resultTotal FROM test t LEFT JOIN user u ON u.user_id = ? LEFT JOIN answer_set ans_set ON ans_set.test_id = t.test_id AND ans_set.user_id = u.user_id AND ans_set.completed = 1 AND ans_set.test_date = (SELECT MAX(a2.test_date) FROM answer_set a2 WHERE a2.test_id = t.test_id AND a2.user_id = u.user_id AND a2.completed = 1) LEFT JOIN answer a ON a.answer_set_id = ans_set.answer_set_id WHERE t.test_id = ? GROUP BY t.test_id',

  // Consulta que trae la media del resultado de todas las empresas registradas en la aplicación por ODS(categoría)
  historicOneTest: 'SELECT answer_set.user_id, answer_set.answer_set_id, test.test_id, answer_set.test_date, COALESCE(SUM(answer.user_answer), 0) AS result, COUNT(answer.user_answer) AS total_answers, CASE WHEN COUNT(answer.user_answer) = 0 THEN 0 ELSE (SUM(answer.user_answer) / (COUNT(answer.user_answer) * 5.0)) * 100 END AS result_total, answer_set.completed FROM test LEFT JOIN answer_set ON answer_set.test_id = test.test_id AND answer_set.user_id = ? LEFT JOIN answer ON answer.answer_set_id = answer_set.answer_set_id WHERE test.test_id = ? GROUP BY test.test_id, answer_set.test_date, answer_set.completed, answer_set.answer_set_id ORDER BY answer_set.test_date DESC;',

  // Consultas que trae la media del resultado de las empresas del mismo sector que la del usuario por ODS(categoría)
  sectorTestAnswerSets: 'SELECT MAX(answer_set_id) as aSet FROM answer_set, company_data, user WHERE company_data.sector_id = ? AND company_data.user_id = user.user_id and user.user_id = answer_set.user_id GROUP BY answer_set.user_id;',
  
  // Consulta para traer lo mismo que la anterior, pero de forma global, sin filtrar por sector
  globalTestAnswerSets: 'SELECT MAX(answer_set_id) as aSet FROM answer_set, user WHERE user.user_id = answer_set.user_id GROUP BY answer_set.user_id',

  // Extaemos la el total de la puntuación de cada anwser set devuelto por la consulta anterior
  allAnswerSetAvg: 'SELECT (sum(ifnull(answer.user_answer, 0)) * 100) / (? * 5) as answerSum FROM answer, answer_set WHERE answer.test_id = ? AND answer.answer_set_id = ? AND answer_set.answer_set_id = answer.answer_set_id'
}


export default sql;