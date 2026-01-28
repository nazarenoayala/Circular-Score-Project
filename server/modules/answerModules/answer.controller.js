import answerDal from "./answer.dal.js";

class AnswerController {

  saveTest = async (req, res) => {

    const {id, answerSetId} = req.params;
    const {answer} = req.body;

    const values = [answerSetId, id, answer];

    try {

      let result = await answerDal.saveTest(values);
      res.status(200).json('ok')
      
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }

  }

  finishTest = async (req, res) => {

    const {id, answerSetId} = req.params;

    try {

      res.status(200).json('ok')
      
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }

  }

}

export default new AnswerController();