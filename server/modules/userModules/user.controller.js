import {compareString , hashString} from '../../utils/bcryptUtils.js'
import {generateToken} from '../../utils/jwtUtils.js'
import sendActivationMail from '../../utils/nodeMailer.js';
import dotenv from 'dotenv'
import userDal from './user.dal.js';

dotenv.config();

class UserController {


  // Controlador para traer la información de los test del user
  showTestData = async(req, res) => {
    const {user_id} = req.params;
    console.log(user_id);
    
    try {
      let utdResult = await userDal.showTestData([user_id])
      
      res.status(201).json({
        message: `Datos de test de usuario ${user_id} obtenidos`,
        utdResult
      })
    } catch (error) {
      console.log();
      res.status(500).json(error)
    }
  }

  // Controlador de registro de usuario
  register = async (req, res) => {
    
    try{
      const {user_email, password} = req.body;

      //encriptar la password
      let hashedPass = await hashString(password, 10);

      let values = [user_email, hashedPass];

      let result = await userDal.register(values);
      
      // Enviamos correo de confirmación
      const user_id = result.insertId;
      const mailResult = await sendActivationMail({user_email: user_email, user_id: user_id});

      const {token} = mailResult;

      res.status(200).json({message: 'Datos insertados en BD', token: token});

    } catch (error){
      console.log(error);
      res.status(500).json(error);
    }
  }

  activateUser = async (req, res) => {

    const {user_id, token} = req.params;

    try {
      
      const ActivateResult = await userDal.activateUser(user_id);

      res.status(201).json({message: "Usuario activado correctamente.", ActivateResult});
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  // Login de usuario
  login = async (req, res) => {
    
    const {user_email, password} = req.body;
    console.log("user controller contenido de user_email", user_email);
    
    try {
      //comprobamos la existencia del email
      let result = await userDal.findUserByEmail(user_email);
      console.log("resultado de la busqueda del email", result);
      
      //si no hay user
      if(result.length === 0){
        res.status(401).json("Email no encontrado en DB");
      } else {

        let match = await compareString(password, result[0].password);

        if(!match){
          res.status(401).json({message: "Contraseña no coincide"});
        } else {
          //generamos un token
          const token = generateToken(result[0].user_id, "2d");
          res.status(200).json({
              message: "Login correcto",
              token: token, 
              user_id: result[0].user_id
            });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  // Recuperamos la información del user usando el token
  userByToken = async (req, res) => {
    const {user_id} = req;
    
    try {
      const userDataResult = await userDal.userByToken(user_id);

      res.status(200).json({
        userData: userDataResult.userData,
        companyData: userDataResult.companyData,
        message: 'User recuperado por token'
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  // Obtiene la info del user para alimentar el profile
  showUserProfile = async (req, res) => {
    const {user_id} = req.params;

    try {
      let userResult = await userDal.showUserProfile([user_id]);

      res.status(200).json({
        message: `Información obtenida del user_id ${user_id}`,
        userResult
      })

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Hacemos update solo a la tabla user
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

  // Borrado lógico del usuario
  banUser = async (req, res) => {
    const {user_id} = req.params;
    try {
      let banResult = await userDal.banUser([user_id]);
      res.status(200).json({
        message: `Usuario con id ${user_id} baneado`,
        banResult
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }
}

export default new UserController();