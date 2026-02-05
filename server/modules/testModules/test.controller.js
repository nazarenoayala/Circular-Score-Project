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

  createTest = async(req, res)=>{
    
    try {
      //como hemos enviado un formData porque cabe la posibilidad 
      //de que se envie imagen, tenemos que hacer el destructuring
      // con parse y el nombre que pusimos en formData
      const {test_name, is_public} = JSON.parse(req.body.newTest);
      const questions = JSON.parse(req.body.questions);
      let values1 = [test_name, null, is_public];
      let values2 = questions;
      //si viene imagen cambio en los values
      if(req.file){
        values1 = [test_name, req.file.filename,is_public]
      }
      let result = await testDal.createTest(values1, values2);
      res.status(200).json({message: 'create Test ok',result});
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

    updateTestName = async (req, res) => {
      const {id} = req.params;
      const {test_name} = req.body;
      let values = [test_name, id];
      try {
        let result = await testDal.updateTestName(values);
        res.status(200).json({message: 'nombre de test actualizado', result});
      } catch (error) {
          console.log(error);
          res.status(500).json(error);
          
      }
    }
}

export default new TestController();