import answerSetDal from "./answerSet.dal.js";

class AnswerSetController {

  startNewAnswerSet = async (req, res) => {

    //Rescatamos del token el id de usuario y rescatamos de req.params el id del test
    // const {user_id} = req
    // Crear la fecha en la que se inicia el test
    const user_id = 2;
    const {id} = req.params;

    let rawDate = new Date();
    let date = rawDate.toISOString().split('T')[0];

    const values = [user_id, id, date];

    try {

      let result = await answerSetDal.startNewAnswerSet(values);
      res.status(200).json({message: 'ok', result});
      
    } catch (error) {

      res.status(500).json('mal');
      console.log(error);
      
    }

  }

  

}

export default new AnswerSetController();