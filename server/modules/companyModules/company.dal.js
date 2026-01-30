import executeQuery, {dbPool} from "../../config/db.js";

class CompanyDal {
  
  
  registerCompany = async (values, multiSelects) => {
    
    
    // Como son varias consultas para esta operación, vamos usar una transacción
    const connection = await dbPool.getConnection();

    
    try{
      
      // Inicializamos la transaction
      await connection.beginTransaction();
      
      // Traemos client_segment y stakeholders, pero no podemos meter eso en esta consulta, así que lo insertamos con el user_id en ambos campos
      let sql = 'INSERT INTO company_data (user_id, company_name, company_email, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
      
      let result = await connection.query(sql, values);
      
      // Preparamos las 2 consultas que insertaran los datos de los selectores multiples a las tablas correspondientes
      
      // Mapeo para convertir a cadena string los values para el insert
      // Saco los 2 arrays de los selectores multiples
      const ccg = multiSelects[0] // client_segment
      const cs = multiSelects[1] // stakeholders
      
      const concatSqlValues = (arr, id) => {
        let string;
        string = arr.map((elem) => `(${id},${elem})`).join(',');
        return string;
      }
      console.log(values);
      
      const multisId = values[0]; //Extraemos el id de la primera posición del array
      let ccgValues = concatSqlValues(ccg, multisId);
      let csValues = concatSqlValues(cs, multisId);

      let sqlccg = `INSERT INTO company_client_group VALUES ${ccgValues}`;
      let sqlcs = `INSERT INTO company_stakeholder VALUES ${csValues}`;
      
      let resultCcg = await connection.query(sqlccg, ccgValues);
      let resultCs = await connection.query(sqlcs, csValues);

      await connection.commit();
      return {result, resultCcg, resultCs}
    }catch(error){
      connection.rollback();
      throw error
    } finally {
      // Si la conexión existe la liberamos
      if(connection){
        connection.release();
      }
    }
  }

  registerCompanyInUser = async (values) => {
    try{
      let sql = 'UPDATE user SET name = ?, position = ?, phone_number = ?, city_id = ?, province_id = ? WHERE user_id = ?'
      let result = await executeQuery(sql, values);
      return result;
    }catch(error){
      throw error;
    }
  }

<<<<<<< HEAD
  editCompany = async (values) => {
    try {
      
=======
  editCompany = async (values, multiSelects) => {

    const connection = await dbPool.getConnection();

    const ccg = multiSelects[0] // client_segment
    const cs = multiSelects[1] // stakeholders

    
    try {
      
      await connection.beginTransaction();
      
      let sql = 'UPDATE company_data SET company_name=?, company_email=?, sector_id=?, company_type=?, legal_form=?, active_years=?, company_size=?, gso=?, client_segment=?, stakeholders=?, sustainability=?, ods_background=? WHERE user_id=?'
      
      let result = await connection.query(sql, values);
      
      // Sacamos el user_id de los values, sabemos que está en la última posición para los select multiples
      const multisId = values.at(-1);
      
      let ccgValues = "";
      let csValues = "";

      for(let i = 0; i < ccg.length ; i++) {
          ccgValues = ccgValues + "(" + multisId + "," + ccg[i] + ")";
          if(i < ccg.length - 1){
            ccgValues = ccgValues + ","
          }
        }
      for(let i = 0; i < cs.length ; i++) {
        csValues = csValues + "(" + multisId + "," + cs[i] + ")";
        if(i < cs.length - 1){
          csValues = csValues + ","
        }
      }

      // Para actualizar vamos a borrar los datos que hubiese en estas tablas, hará mas sencillas las cosas
      let sqlccg = `DELETE FROM company_client_group WHERE user_id = ${multisId}`
      let sqlcs = `DELETE FROM company_stakeholder WHERE user_id = ${multisId}`
      await connection.query(sqlccg, ccgValues);
      await connection.query(sqlcs, csValues);

      // Una vez limpia la tabla insertamos los valores actualizados
      sqlccg = `INSERT INTO company_client_group VALUES ${ccgValues}`;
      sqlcs = `INSERT INTO company_stakeholder VALUES ${csValues}`;
      
      let resultCcg = await connection.query(sqlccg, ccgValues);
      let resultCs = await connection.query(sqlcs, csValues);

      await connection.commit();
      return {result, resultCcg, resultCs}
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
    } catch (error) {
      throw error;
    }
  }

  editCompanyInUser = async (values) => {
    try {
<<<<<<< HEAD
      let sql = 'UPDATE user SET name = ?, position = ?, phone_number = ?, user_email = ?, city_id = ?, province_id = ? WHERE user_id = ? AND is_deleted = 0 AND is_confirmed = 1';
      let result = await executeQuery(sql, values);

=======
      let sql = 'UPDATE user SET name = ?, last_name = ?, position = ?, phone_number = ?, city_id, province_id = ? WHERE user_id = ?';
      let result = await executeQuery(sql, values);
>>>>>>> b94f225a9a5d507ef3fd9ed2c43f60b26434f021
      return result;
    } catch (error) {
      throw error;
    }
  }

  //pedir datos de localidades y provincias
  locality = async() => {
    try{
      let sql = 'SELECT * FROM city';
      let result = await executeQuery(sql);
      return result;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  Province = async() => {
    try{
      let sql = 'SELECT * FROM province';
      let result = await executeQuery(sql);
      return result;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  showCompanyProfile = async(user_id) => {
    try {
      let sql = 'SELECT * FROM company_data WHERE user_id=?'

      return await executeQuery(sql, [user_id]);

    } catch (error) {
      throw error;
    }
  }

  //todas las empresas. esta consulta permite que cada objeto de empresa lleve los datos de la persona de contacto .yas
  allCompanies = async() => {
    try {
     let sql = `
      SELECT 
        c.*, 
        u.name, 
        u.last_name, 
        u.user_email, 
        u.phone_number,
        u.is_deleted
        FROM company_data c
        JOIN user u ON c.user_id = u.user_id
        WHERE u.is_confirmed = 1
       `;

      return await executeQuery(sql);

    } catch (error) {
      throw error;
    }
  }

  showOneCompany = async(user_id) => {
    try {
      let sql = 'SELECT * FROM company_data LEFT JOIN user ON company_data.user_id = user.user_id WHERE company_data.user_id = ?'

      return await executeQuery(sql, [user_id]);

    } catch (error) {
      throw error;
    }
  }



  //Trae los datos de cada vez que se realizó un test, qué empresa lo hizo, su sector, la fecha y la puntuación
  allTestCompaniesData = async(test_id) => {
    try {
      let sql = `
      SELECT 
        company_data.company_name,
        company_data.user_id,
        sector.sector_name,
        answer_set.test_id,
        answer_set.test_date,
        answer_set.answer_set_id,
        SUM(answer.user_answer) AS total_score
      FROM company_data
      JOIN sector
        ON company_data.sector_id = sector.sector_id
      JOIN answer_set
        ON company_data.user_id = answer_set.user_id
      JOIN answer
        ON answer_set.answer_set_id = answer.answer_set_id
        AND answer_set.test_id = answer.test_id
      WHERE answer_set.test_id = ?
      GROUP BY 
        company_data.company_name,
        sector.sector_name,
        answer_set.test_date,
        answer_set.answer_set_id
      ORDER BY 
        answer_set.test_date
      `;
      return await executeQuery(sql, [test_id]);
    } 
    catch (error) {
      throw error;
    }
  }
}

export default new CompanyDal();
