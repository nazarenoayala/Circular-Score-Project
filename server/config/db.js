import sql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const dbPool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true
})


const executeQuery = async (sql, values = []) => {

  let connection;

  try {
    // abrimos conexión con la pool

    connection = await dbPool.getConnection();
    
    // Ejecutamos la petición
    const [result] = await connection.query(sql, values);

    console.log('Conectado a la base de datos');

    return result;
    
  } catch (error) {
    console.log('Error en la consulta', error);
    throw error;
  }
  finally {
    // Cerramos la conexión
    if (connection) {
      connection.release();
    }
  }
} 

export default executeQuery;