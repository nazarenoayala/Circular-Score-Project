import executeQuery from "../../config/db.js";

class CompanyDal {


  registerCompany = async (values) => {

    console.log(values);
    
    try{

      //Saco el id de la primera posición del array
      const user_id = values[0];
      
      // Modificamos el valor de los 2 campos que deben tener el user_id directamente reemplazando posiciones del array
      let realValues = [...values];
      realValues.splice(9, 2, user_id, user_id);

      // Traemos client_segment y stakeholders, pero no podemos meter eso en esta consulta, así que lo insertamos con el user_id en ambos campos
      let sql = 'INSERT INTO company_data (user_id, company_name, company_email, sector_id, company_type, legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
      let result = await executeQuery(sql, realValues);

      // Preparamos las 2 consultas que insertaran los datos de los selectores multiples a las tablas correspondientes
      let ccg = values[9] // client_segment
      let cs = values[10] // stakeholders
      /* let user_id = values[0].user_id; */
      let ccgValues = "";
      let csValues = "";

      console.log("VALORES CCG Y CS", ccg, cs);
      
      // Con estos bucles convertimos el nº de posiciones del array, en VALUES() para el insert en la tabla
      for(let i = 0; i < ccg.length ; i++) {
        ccgValues = ccgValues + "(" + user_id + "," + ccg[i] + ")";
        if(i < ccg.length - 1){
          ccgValues = ccgValues + ","
        }
      }
      for(let i = 0; i < cs.length ; i++) {
        csValues = csValues + "(" + user_id + "," + cs[i] + ")";
        if(i < cs.length - 1){
          csValues = csValues + ","
        }
      }

      let sqlccg = `INSERT INTO company_client_group VALUES ${ccgValues}`;
      let sqlcs = `INSERT INTO company_stakeholder VALUES ${csValues}`;

      let resultCcg = await executeQuery(sqlccg, ccgValues);
      let resultCs = await executeQuery(sqlcs, csValues);
      
      return {result, resultCcg, resultCs}
    }catch(error){
      throw error
    }
  }

  registerCompanyInUser = async (values) => {
    try{
      let sql = 'UPDATE user SET contact_name = ?, position = ?, phone_number = ?, user_email = ?, city_id = ?, province_id = ? WHERE user_id = ?'
      let result = await executeQuery(sql, values);
      return result;
    }catch(error){
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

  editCompanyProfile = async (values) => {
    try {
      let sql = 'UPDATE company_data SET company_name=?, sector_id=?, legal_form=?, active_years=?, company_size=?, gso=?, stakeholders=?, sustainability=?, ods_background=? WHERE user_id=?'

      await executeQuery(sql, values);

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
        u.phone_number 
      FROM company_data c
      JOIN user u ON c.user_id = u.user_id
      WHERE u.is_deleted = 0
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

  delLogicCompany = async(user_id) => {
    try {
      let sql = 'UPDATE user SET is_deleted = IF(is_deleted= 0, 1, 0) WHERE user_id = ?'

      await executeQuery(sql, [user_id]);

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