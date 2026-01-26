//Comprueba si hay token válido, extrae id de usuario y permite o bloquea el acceso en función de ello.

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const verifyToken = (req, res, next) => {
  const tokenBeared = req.headers.authorization;
  
   if (!tokenBeared) {
    res.status(401).json({message: "No autorizado"})
   } else {
      const token = tokenBeared.split(" ")[1];
      jwt.verify(token, process.env.SECRET_TOKEN_KEY,
        (err, result) => {
          if (err) {
<<<<<<< HEAD
            console.log("error token", result);
=======
            console.log("error token", err);
>>>>>>> 85a39b9a9843f544f10056033096c2b66b56cab8
            res.status(401).json({message: "No autorizado"})
          } else {
            req.user_id = result.user_id;
            next();
          }

        })
    }
}