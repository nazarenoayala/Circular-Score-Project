import {z} from 'zod'

export const companyRegisterSchema = z.object({
  company_name: z.string()
              .min(2, 'El nombre debe contener al menos 2 caracteres')
              .max(100, 'El nombre debe de contener como máximo 100 caracteres'),
  contact_name: z.string()
                     .min(2, 'El nombre debe contener al menos 2 caracteres')
                     .max(50, 'El nombre debe contener como máximo 50 caracteres')
                     .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede contener ni números ni carácteres especiales'), 
  phone_number: z.string()
                    .min(2, 'El número debe contener al menos 2 caracteres')
                    .max(20, 'El nombre debe contener como máximo 20 caracteres')
                    .regex(/^\+?[0-9]+$/, 'Solo debe contener Números y símbolo + si es necesario'),
  user_email: z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'), 

  position_other: z.string()
                     .min(2, 'El nombre debe contener al menos 2 caracteres')
                     .max(50, 'El nombre debe contener como máximo 50 caracteres')
                     .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede contener ni números ni carácteres especiales'),           
  sector_name_other: z.string()
                     .min(2, 'El nombre debe contener al menos 2 caracteres')
                     .max(50, 'El nombre debe contener como máximo 50 caracteres')
                     .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede contener ni números ni carácteres especiales'),           
})  
