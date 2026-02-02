import answerSetDal from "./answerSet.dal.js";

class AnswerSetController {

  startNewAnswerSet = async (req, res) => {

    //Rescatamos del token el id de usuario ,rescatamos de req.params el id del test y la fecha en la que se inicia el test:
    const {user_id} = req
    const {id} = req.params;
    let rawDate = new Date();
    let date = rawDate.toISOString().split('T')[0];

    const values = [user_id, id, date];

    try {

      let result = await answerSetDal.startNewAnswerSet(values);
      res.status(200).json({message: 'ok', result});
      
    } catch (error) {

      res.status(error.status || 500).json(error.message);
      console.log(error);
      
    }
  }

  getAnswerSet = async (req, res) => {

    const {id} = req.params;
    const {user_id} = req;
    const values = [id, user_id];

    try {

      let result = await answerSetDal.getAnswerSet(values);
      res.status(200).json({message: 'AnswerSet traido al front', result});
      
    } catch (error) {

      console.log(error);
      res.status(500).json(error);
      
    }

  }

  deleteAnswerSet = async (req, res) => {

    const {id} = req.params;
    const values = [id];

    try {

      let result = await answerSetDal.deleteAnswerSet(values);
      res.status(200).json({message: 'Answer Set eliminado'});
      
    } catch (error) {
      res.status(500).json(error);
    }


  }

  finishTest = async (req, res) => {

    try {

      const {answerSetId} = req.body;
      const {user_id} = req;

      let values = [answerSetId, user_id];

      let result = await answerSetDal.finishTest(values);

      res.status(200).json({message: 'Test finalizado'});
      
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({message: error.message});
    }
  }

}

export default new AnswerSetController();