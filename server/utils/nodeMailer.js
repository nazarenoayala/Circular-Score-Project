import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateToken } from "./jwtUtils.js";

dotenv.config();
//const __dirname = path.resolve();

// Ruta absoluta para la imagen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: `${process.env.MAILER_EMAIL}`,
    pass: `${process.env.MAILER_PASS}`,
  },
});

// Pasamos el HTML a string, usando las librerías fs y path de node
const loadHtmlTemplate = () => {
    const filePath = path.join(__dirname,
      '..',
      "public",
      "mail",
      "Email.html"
      )
  return fs.readFileSync(filePath, "utf8");
}

// Incrustamos el logo como attachment para poder cargarlo en el correo
const generatAtachment = () => [{
  filename: 'logoblanco.png',
  path: path.join(__dirname,
     '..',
      "public",
       "images",
       "logo",
       "logoblanco.png"), // Ruta de la imagen
  cid: 'logo-circular' // Mismo nombre que en el src=cid: dentro de img en html
}];

// Exporto la funcionalidad para poder usarla en el controlador
const sendActivationMail = async (userData) => {
  
  const {user_email, user_id} = userData;
  try {
    // He aprovechado para parametrizar la duración del generate token
    const activationToken = generateToken(user_id, "15m");
    const activationLink = `${process.env.MAILER_ACTIVATE}/${activationToken}/${user_id}`;
    const subject = "Correo de confirmación de cuenta CircularScore";
    let html = loadHtmlTemplate();
    // Cargamos en el html la iformación del usuario, y el link con parámetro dinámico con el id de usuario interpolado
    html = html
    .replace("{{htmlText}}", "Usa el link facilitado para crear activar la cuenta, caduca en 15 minutos.")
    .replace("{{userEmail}}", user_email)
    .replace("{{navigationLink}}", activationLink)
    .replace("{{linkText}}", "ACTIVA TU CUENTA AQUÍ");
    
    console.log(html);
    const info = await transporter.sendMail({
      to: user_email,
      subject,
      html,
      attachments: generatAtachment()
    })
    console.log("Correo de activación enviado.", info.messageId);
    return {token: activationToken, info: info};
  } catch (error) {
    throw error;
  }
  
};

export const resetPasswordMail = async (userData) => {
  const {user_email, user_id} = userData;
  console.log("ENTRAMOS AL RESET PASSWORD MAIL");
  
  try{
    const resetPassToken = generateToken(user_id, "15m");
    const resetPassLink = `${process.env.MAILER_RESETPASS}/${resetPassToken}/${user_id}`;
    const subject = "Recupera la constraseña de tu cuenta de Circular Score";
    let html = loadHtmlTemplate();
    // Cargamos en el html la iformación del usuario, y el link con parámetro dinámico con el id de usuario interpolado
    html = html
    .replace("{{htmlText}}", "Usa el link facilitado para crear una nueva contraseña, caduca en 15 minutos.")
    .replace("{{userEmail}}", user_email)
    .replace("{{navigationLink}}", resetPassLink)
    .replace("{{linkText}}", "MODIFICA TU CONSTRASEÑA AQUÍ");
    
    console.log(html);
    console.log("ESTADO DEL HTML TRAS PROCESAR RESETPASSMAIL", html);
    const info = await transporter.sendMail({
      to: user_email,
      subject,
      html,
      attachments: generatAtachment()
    })
    console.log("Correo de recuperación de pass, enviado.", info.messageId);
    return {token: resetPassToken, info: info};
  }catch (error){
    throw error;
  }
}

export const contactUs = async(userContact) => {

  const {subject, email, message} = userContact;

  try {

    const info = await transporter.sendMail({

      from: email,
      to: process.env.MAIL_ADMIN,
      subject,
      text: `Mensaje de: ${email} - ${message}`
    })

    console.log('Correo de contacto enviado', info.messageId);
    return {info: info}

  } catch (error) {
    console.log(error);
    throw error;
  }

}

export default sendActivationMail;