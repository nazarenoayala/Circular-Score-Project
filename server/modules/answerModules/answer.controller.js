import answerDal from "./answer.dal.js";

class AnswerController {

  saveQuestions = async (req, res) => {

    const {id, answerSetId} = req.params;
    console.log(req.params);
    const {answer} = req.body;
    const {user_id} = req;

    const values = [answerSetId, id, answer, user_id];

    try {

      let result = await answerDal.saveQuestions(values);
      res.status(200).json('ok')
      
    } catch (error) {
      res.status(error.status || 500).json({message: error.message});
      console.log(error);
    }

  }

  savedAnswers = async (req, res) => {
    const {answer_set_id} = req.params;

    try {
      
      let result = await answerDal.savedAnswers(answer_set_id);
      
      res.status(200).json({result});
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  }

}

export default new AnswerController();