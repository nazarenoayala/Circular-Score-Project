import statisticsDal from "./statistics.dal.js";

class StatisticsController {

  getAllRecentResults = async (req, res) => {

    // Aquí rescatamos el id del token
    // const {id} = req;
    // const values = [id];
    const values = [2];

    try {

      let result = await statisticsDal.getAllRecentResults(values);
      res.status(200).json({message: 'Todos los resultados más recientes por test ODS y de la compañía', result});
      
    } catch (error) {
      res.status(500).json(error);
    }

  } 

  getHistoricFromOneTest = async (req, res) => {

    const {test_id} = req.params;
    // rescatamos del token el id de usuario
    // const {id} = req
    const id = 2
    const values = [id, test_id];

    try {

      let result = await statisticsDal.getHistoricFromOneTest(values);

      res.status(200).json({message: 'Historico de un test', result});
      
    } catch (error) {
      res.status(500).json(error);
    }

  }

}

export default new StatisticsController();