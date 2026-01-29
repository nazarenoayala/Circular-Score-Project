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

  createQuestion = async(req, res)=>{
    console.log(req.body);
    
    const {id} = req.params
    const {premium} = req.body;
    try {
      let result = await questionDal.createQuestion([premium])
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

}

export default new QuestionClass();