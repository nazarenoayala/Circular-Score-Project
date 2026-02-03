import questionDal from "./question.dal.js";

class QuestionClass {

  getOneTestQuestions = async (req, res) => {

    const {id} = req.params;
    const values = [id];

    try {

      let result = await questionDal.getOneTestQuestions(values);

      res.status(200).json({result});
      
    } catch (error) {
      res.status(500).json('mal')
      console.log(error);
    }
  } 

  updateQuestions = async (req, res) => {

    const {test_id, question_id, question_text} = req.body;
    const values = [test_id, question_id, question_text];

    try {
      
      let result = await questionDal.updateQuestions(values);
      res.status(200).json({result});

    } catch (error) {
      res.status(500).json(error)
      console.log(error);
      
    }

  }

}

export default new QuestionClass();