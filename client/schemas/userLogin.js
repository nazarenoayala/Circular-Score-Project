import {z} from 'zod';

export const loginSchema = z.object({
  
  email: z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'),
  password: z.string()
                .min(8, 'La contraseña debe tener mínimo, 8 carácteres')
                .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'La contraseña debe tener al menos una mayúscula, un carácter especial y un número'),
})

// Validaciones de datos
// email, formato email
// password: mínimo 8 carácteres, 1 mayúscula, 1 minúscula, 1 carácter especial, 1 carácter numérico.