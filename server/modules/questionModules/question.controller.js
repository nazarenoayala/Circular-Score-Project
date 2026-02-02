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

}

export default new QuestionClass();