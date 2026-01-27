import {z} from 'zod';

// Esquema de validación de datos de la ventana de registro de usuarios
const resetPassSchema = z.object({
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

export default resetPassSchema;

// El password debe tener tener mínimo 8 carácteres de los cuales: 1 mayúscula, 1 minúscula, 1 numérico y 1 carácter especial
// La confirmación de password debe ser idéntica al password y cumplir los mismos requisitos que el password. 