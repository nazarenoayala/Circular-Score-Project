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

      res.status(200).json({message: 'Datos de test traidos con éxito', result});
      
    } catch (error) {

      console.log(error);

      res.status(500).json(error);
      
    }

  }

  disableTest = async (req, res) => {

    const {id} = req.params;
    let values = [id];

    try {

      let result = await testDal.disableTest(values);

      res.status(200).json({message: 'Test deshabilitado', result});
      
    } catch (error) {

      console.log(error);
      res.status(500).json(error);
      
    }

  }

  editTest = async (req, res) => {

    const {test_name} = req.body;
    let value = [test_name];

    try {

      let result = testDal.createTest(value);

      res.status(200).json({message: 'test editado correctamente', result});
      
    } catch (error) {

      res.status(500).json(error);
      console.log(error);
    }

  }

}

export default new TestController();