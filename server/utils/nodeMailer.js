import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";
import { generateToken } from "./jwtUtils.js";

dotenv.config();
const __dirname = path.resolve();

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
  const filePath = path.join(
    __dirname,
    "public",
    "mail",
    "activationEmail.html"
  );

  return fs.readFileSync(filePath, "utf8");
}

// Exporto la funcionalidad para poder usarla en el controlador
const sendActivationMail = async (userData) => {
  
  const {user_email, user_id} = userData;
  console.log("userEmail en el correo", user_email);

  const activationToken = generateToken(user_id, "20m");
  const activationLink = `${process.env.MAILER_HOST}/activateUser/${user_id}/${activationToken}`;
  const subject = "Correo de confirmación de cuenta CircularScore";
  const text = "Usa el link facilitado para completar la activación de tu cuenta en Circular Score."
  let html = loadHtmlTemplate();
  // Cargamos en el html la iformación del usuario, y el link con parámetro dinámico con el id de usuario interpolado
  html = html
             .replace("{{userEmail}}", user_email)
             .replace("{{activationLink}}", activationLink);
  
  console.log("ESTADO DEL HTML TRAS PROCESAR CON MAILER", html);
  

  const info = await transporter.sendMail({
    to: user_email,
    subject,
    text,
    html
  })
  console.log("Mensaje enviado con éxito", info.messageId);
  return {token: activationToken, info: info};
};

export default sendActivationMail;