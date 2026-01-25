//Comprueba si hay token válido, extrae id de usuario y permite o bloquea el acceso en función de ello.

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const verifyActivateToken = (req, res, next) => {
  
  const {token} = req.params;
  
   if (!token) {
    return res.status(401).json({message: "No autorizado"});
   } else {
      jwt.verify(token, process.env.SECRET_TOKEN_KEY,
        (err, result) => {
          if (err) {
            console.log("Error al validar.", err);
            res.status(401).json({message: "Token inválido o caducado."})
          }
          next();
        });
      }
}