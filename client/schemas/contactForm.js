import {z} from 'zod'

export const contactFormSchema = z.object({
  
  subject: z.string()
  .min(2, 'El nombre debe contener al menos 2 caracteres')
  .max(50, 'El nombre debe contener como máximo 50 caracteres')
  .regex(/^[A-Za-zÑñÁÉÍÓÚáéíóú]+(?: [A-Za-zÑñÁÉÍÓÚáéíóú]+)*$/, 'El nombre no puede contener ni números ni carácteres especiales'), 

  email:  z.string()
          .min(1, 'El email es obligatorio')
          .email('Debes introducir un email válido'),

  message: z.string()
            .min(2, 'Texto demasiado corto')
            .max(1000, 'Texto demasiado largo')
})