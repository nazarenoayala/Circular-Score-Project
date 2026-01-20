import userDal from './user.dal.js';

class UserController {

  test = async (req, res) => {
  try {

    let result = await userDal.test();

    console.log(result);

    res.status(200).json({message: 'datos ok', result})

  } catch (error) {
    res.status(500).json('Ruta no ok')
    console.log(error);
  }
}

}

export default new UserController();