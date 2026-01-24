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

}

export default new StatisticsDal();