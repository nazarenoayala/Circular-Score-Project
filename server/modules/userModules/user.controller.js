import {compareString , hashString} from '../../utils/bcryptUtils.js'
import {generateToken} from '../../utils/jwtUtils.js'
import sendActivationMail, { contactUs } from '../../utils/nodeMailer.js';
import { resetPasswordMail } from '../../utils/nodeMailer.js';
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
      await sendActivationMail({user_email: user_email, user_id: user_id});
      res.status(200).json({message: 'Datos insertados en BD'});

    } catch (error){
      console.log(error);
      res.status(500).json(error);
    }
  }

  activateUser = async (req, res) => {

    const {user_id} = req.params;

    try {
      
      const ActivateResult = await userDal.activateUser(user_id);

      res.status(201).json({message: "Usuario activado correctamente.", ActivateResult});
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  findResetPassword = async (req, res) => {

    const {user_email} = req.body;
    
    try {
      
      const result = await userDal.findResetPassword(user_email);
      console.log("resultado",result);
      
      let message = "Email no encontrado";
      let mailResult = 0;
      if(result.length !== 0){
        message = "Correo de recuperación enviado";
        // Enviamos correo de restauración de contraseña
        mailResult = await resetPasswordMail({user_email: user_email, user_id: result[0].user_id});
      }
      res.status(201).json({message: message, userExists: mailResult});

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  updatePassword = async (req, res) => {

    const {password} = req.body;
    const {user_id} = req;

    try {
      
      // Hasheamos la nueva contraseña
      let hashedPass = await hashString(password, 10);

      let values = [hashedPass, user_id]

      // Mandamos el hash y el user id al dal para hacer el update
      await userDal.updatePassword(values);
      
      res.status(200).json({message: "Contraseña actualizada."});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Login de usuario
  login = async (req, res) => {
    
    const {user_email, password} = req.body;
    
    try {
      //comprobamos la existencia del email
      let result = await userDal.findUserByEmail(user_email);
      
      //si no hay user
      if(result.length === 0){
        res.status(401).json("Usuario no autorizado");
      } else {

        let match = await compareString(password, result[0].password);

        if(!match){
          res.status(401).json("Usuario no autorizado");
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
  updateProfile = async (req, res) => {
    const {userData, companyData} = req.params;

    if(userData.length !== 0){
      try {
        const {name, last_name, phone_number, city_id , province_id, position, user_id} = userData;
        let values = [name, last_name, phone_number, city_id, province_id, position, user_id];
  
        let uptResult = await userDal.updateUserProfile(values);
  
        res.status(200).json({
          message: "Actualizado correctamente",
          uptResult
        });
        
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
    }

    if(companyData.length !== 0){
      try {
        const {user_id} = userData;
        const {company_name, company_email, sector_id, company_type , legal_form, active_years, company_size, gso, client_segment, stakeholders, sustainability, ods_background} = companyData;
        let values = [company_name, company_email, sector_id, company_type, legal_form, active_years, company_size, gso, sustainability, ods_background, user_id];
  
        let uptResult = await userDal.updateCompanyProfile(values, {client_segment: client_segment, stakeholders: stakeholders});
  
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

 // Borrado lógico del usuario
  setUserState = async (req, res) => {
 
    const {user_id} = req.params;
    try {
      let banResult = await userDal.changeUserState(user_id);
      res.status(200).json({
        message: `Usuario con id ${user_id} ${banResult === 0 ? "Activado" : "Desactivado"}`,
        banResult
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
 
 
  contact = async (req, res) => {

    try {

      let resultContact = await contactUs(req.body);

      res.status(200).json({message: 'Correo recibido del usuario', resultContact});
      
    } catch (error) {
      res.status(500).json(error);
    }

  }

}

export default new UserController();