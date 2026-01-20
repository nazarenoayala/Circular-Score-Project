import userDal from './user.dal.js';

class UserController {

  test = (req, res) => {
  try {
    res.status(200).json('Ruta ok')
  } catch (error) {
    res.status(500).json('Ruta no ok')
    console.log(error);
  }
}

}

export default new UserController();