import statisticsDal from "./statistics.dal.js";

class StatisticsController {

  getAllRecentResults = async (req, res) => {

    const {user_id} = req;
    const values = [user_id];

    try {

      let result = await statisticsDal.getAllRecentResults(values);
      res.status(200).json({message: 'Todos los resultados más recientes por test ODS y de la compañía', result});
      
    } catch (error) {
      res.status(500).json(error);
    }

  } 

  getHistoricFromOneTest = async (req, res) => {

    const {test_id} = req.params;
    const {user_id} = req
    const values = [user_id, test_id];

    try {

      let result = await statisticsDal.getHistoricFromOneTest(values);
      res.status(200).json({message: 'Historico de un test', result});
      
    } catch (error) {
      res.status(500).json(error);
    }
    
  }
  
  getSectorAvgScore = async (req, res) => {
    
    const {question_count, sector_id, test_id} = req.body;
    
    try {
      
      let result = await statisticsDal.getSectorAvgScore({question_count, sector_id, test_id});

      res.status(200).json({message: 'Media por sector obtenida.', result});
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  getGlobalAvgScore = async (req, res) => {
    
    const {question_count, test_id} = req.body;
    
    try {
      
      let result = await statisticsDal.getGlobalAvgScore({question_count ,test_id});

      res.status(200).json({message: 'Media global obtenida.', result});
    } catch (error) {
      res.status(500).json(error);
    }

  }

}

export default new StatisticsController();