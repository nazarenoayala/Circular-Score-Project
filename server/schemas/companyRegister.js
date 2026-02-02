import {z} from 'zod';

export const registerCompanySchema = z.object({
  company_name: z.string()
              .min(2, 'El nombre debe contener al menos 2 caracteres')
              .max(100, 'El nombre debe de contener como máximo 100 caracteres'),
  
  company_email:  z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'),

  contact_name: z.string()
                     .min(2, 'El nombre debe contener al menos 2 caracteres')
                     .max(50, 'El nombre debe contener como máximo 50 caracteres')
                     .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede contener ni números ni carácteres especiales'), 
  phone_number: z.string()
                    .min(2, 'El número debe contener al menos 2 caracteres')
                    .max(20, 'El número debe contener como máximo 20 caracteres')
                    .regex(/^\+?[0-9]+$/, 'Solo debe contener Números y símbolo + si es necesario'),
  user_email: z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'),
            
  position: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  company_type: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  legal_form: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  active_years: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  company_size: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  sector_id: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  city_id: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  province_id: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  gso: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  client_segment: z.
                    array(z.number())
                    .min(1, 'Debe seleccionar al menos una opción'),
  stakeholders:  z.
                    array(z.number())
                    .min(1, 'Debe seleccionar al menos una opción'), 
  sustainability: z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
  ods_background:  z
            .number('Valor no válido')
            .positive('Valor no válido')
            .int('Valor no válido'),
})