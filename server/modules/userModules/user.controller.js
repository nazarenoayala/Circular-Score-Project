import {compareString , hashString} from '../../utils/bcryptUtils.js'
import {generateToken} from '../../utils/jwtUtils.js'
import userDal from './user.dal.js';

class UserController {

  test = async (req, res) => {

    try {
      res.status(200).json('Bien');
    } catch (error) {
      res.status(500).json('Mal');
    }

  }

  register = async (req, res) => {
    try{
      const {name, email, password} = req.body;

      //encriptar la password
      let hashedPass = await hashString(password, 10);

      let values = [name, email, hashedPass]

      let result = await userDal.register(values);
      
      res.status(200).json({message: 'Datos insertados en BD', result});

    } catch (error){
      console.log(error);
      res.status(500).json(error);
    }
  }

  login = async (req, res) => {
    
    const {email, password} = req.body;

    try {
      //comprobamos la existencia del email
      let result = await userDal.findUserByEmail(email);

      //si no hay user
      if(result.length === 0){
        res.status(401).json("Email no encontrado en DB");
      } else {

        let match = await compareString(password, result[0].password);

        if(!match){
          res.status(401).json({message: "Contraseña no coincide"});
        } else {
          //generamos un token
          const token = generateToken(result[0].user_id);
          console.log("Token generado correctamente");
          res.status(200).json({message: "Login correcto", token});
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  editUser = async (req, res) => {
    try {
      const {name, last_name, phone_number, city_id , province_id, position, user_id} = req.body;
      let values = [name, last_name, phone_number, city_id, province_id, position, user_id];

      let uptResult = await userDal.editUser(values);

      res.status(200).json({
        message: "Actualizado correctamente",
        uptResult
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
}

export default new UserController();