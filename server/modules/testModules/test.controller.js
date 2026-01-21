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

}

export default new TestController();