const sql = {
  
  // consulta para obtener los resultados más recientes de cada test ODS por EMPRESA
  allResults: 'SELECT t.test_id, cd.company_name, COALESCE(SUM(a.user_answer), 0) AS result, COUNT(a.user_answer) AS total, CASE WHEN COUNT(a.user_answer) = 0 THEN 0 ELSE (SUM(a.user_answer) / (COUNT(a.user_answer) * 5)) * 100 END AS resultTotal FROM test t CROSS JOIN company_data cd LEFT JOIN user u ON u.user_id = cd.user_id LEFT JOIN answer_set ans_set ON ans_set.test_id = t.test_id AND ans_set.user_id = u.user_id AND ans_set.completed = 1 AND ans_set.test_date = (SELECT MAX(a2.test_date) FROM answer_set a2 WHERE a2.test_id = t.test_id AND a2.user_id = u.user_id) LEFT JOIN answer a ON a.answer_set_id = ans_set.answer_set_id WHERE cd.user_id = ? GROUP BY t.test_id, cd.company_name;'
}


export default sql;