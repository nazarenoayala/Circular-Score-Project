//Genera Token y define validez
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const generateToken = (id, expiration) => {
  let payload = {user_id: id}

  return jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {expiresIn:`${expiration}`})
}
