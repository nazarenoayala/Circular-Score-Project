import answerDal from "./answer.dal.js";

class AnswerController {

  saveQuestions = async (req, res) => {

    const {id, answerSetId} = req.params;
    console.log("******************",req.params);
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

}

export default new AnswerController();