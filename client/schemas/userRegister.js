import {z} from 'zod';

// Esquema de validación de datos de la ventana de registro de usuarios
const registerSchema = z.object({
  // name: z.string()
  //           .min(2, 'El nombre debe contener al menos 3 caracteres')
  //           .max(50, 'El nombre debe contener como máximo 50 caracteres')
  //           .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede contener ni números ni carácteres especiales'),
  user_email: z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'),
  password: z.string()
                .min(8, 'La contraseña debe tener mínimo, 8 carácteres')
                .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'La contraseña debe tener al menos una mayúscula, un carácter especial y un número'),
  repPassword: z.string()
                .min(8, 'La contraseña debe tener mínimo, 8 carácteres')
                .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'La contraseña debe tener al menos una mayúscula, un carácter especial y un número'),
}).refine((data) => data.password === data.repPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['repPassword']
});

export default registerSchema;

// Las validaciones para el registro de usuario:
// nombre, debe contener al menos 2 carácteres, máximo 50 y no puede contener ni números ni carácteres especiales
// el email debe tener formato email
// El password debe tener tener mínimo 8 carácteres de los cuales: 1 mayúscula, 1 minúscula, 1 numérico y 1 carácter especial
// La confirmación de password debe ser idéntica al password y cumplir los mismos requisitos que el password. 