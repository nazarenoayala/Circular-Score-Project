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
    //cogemos el id de la ruta 
    const {id} = req.params
    //como mandamos un array, lo sacamos del req.body
    const questions = req.body;
    
    try {
      //hacemos que un bucle recorra el array para sacar cada 
      //info y meterla en la variable question y despues hacemos 
      //un destructuring de question
      for(const question of questions){
        const {question_text, premium} = question;
        await questionDal.createQuestion([id, question_text,premium])
      }
      res.status(200).json({message: 'Preguntas creadas correctamente'})
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

}

export default new QuestionClass();