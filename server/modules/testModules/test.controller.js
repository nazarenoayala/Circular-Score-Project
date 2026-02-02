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

  enableTest = async (req, res) => {

    const {id} = req.params;
    let value = [id];

    try {

      let result = await testDal.enableTest(value);

      res.status(200).json({message: 'Test habilitado', result});
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new TestController();