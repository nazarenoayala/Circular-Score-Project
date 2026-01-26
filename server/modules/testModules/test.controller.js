import testDal from "./test.dal.js";

class TestController {

  selectAllTest = async (req, res) => {

    try {
      
      let result = await testDal.selectAllTest();

      res.status(200).json({message: 'Ruta ok', result});


    } catch (error) {
      
      res.status(500).json('No ok');
      console.log(error);
    }

  }

  selectOneTest = async (req, res) => {

    const {id} = req.params;

    const value = [id];

    try {

      let result = await testDal.selectOneTest(value);

      res.status(200).json({message: 'El test se ha cargado de BD', result});
      
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }

  }

}

export default new TestController();