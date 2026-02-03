

import {z} from 'zod'
import { question3Length } from '../src/data/CompanyRegisterData/Question3'
import { question17Length } from '../src/data/CompanyRegisterData/Question17';
import { question7Length } from '../src/data/CompanyRegisterData/Question7';
import { question6Length } from '../src/data/CompanyRegisterData/Question6';
import { question8Length } from '../src/data/CompanyRegisterData/Question8';
import { question9Length } from '../src/data/CompanyRegisterData/Question9';
import { question10Length } from '../src/data/CompanyRegisterData/Question10';
import { question16Length } from '../src/data/CompanyRegisterData/Question16';
import { question13Length } from '../src/data/CompanyRegisterData/Question13';


const intFromInput = ({max, min = 1, message = "Valor inválido" }) =>
  z
    .any()
    .superRefine((value, ctx) => {
      const raw = typeof value === "string" ? value.trim() : value;
      const n = raw === "" ? NaN : typeof raw === "number" ? raw : Number(raw);

      const ok =
        Number.isFinite(n) &&
        Number.isInteger(n) &&
        n >= min &&
        n <= max;

      if (!ok) ctx.addIssue({ code: "custom", message });
    })
    .transform((value) => {
      const raw = typeof value === "string" ? value.trim() : value;
      return typeof raw === "number" ? raw : Number(raw);
    });


export const companyRegisterSchema = z.object({
  company_name: z.string()
              .min(2, 'El nombre debe contener al menos 2 caracteres')
              .max(100, 'El nombre debe de contener como máximo 100 caracteres'),
  
  company_email:  z.string()
            .min(1, 'El email es obligatorio')
            .email('Debes introducir un email válido'),

  name: z.string()
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
            
  position: intFromInput({max:question3Length}),
  company_type: intFromInput({max:question6Length}),
  legal_form: intFromInput({max:question7Length}),
  active_years: intFromInput({max:question8Length}), 
  company_size: intFromInput({max:question9Length}),
  sector_id: intFromInput({max:question10Length}),
  city_id: intFromInput({max: 8117}),
  province_id: intFromInput({max: 53}),
  gso: intFromInput({max:question13Length}),
  client_segment: z.
                    array(z.number())
                    .min(1, 'Debe seleccionar al menos una opción'),
  stakeholders:  z.
                    array(z.number())
                    .min(1, 'Debe seleccionar al menos una opción'), 
  sustainability: intFromInput({max:question16Length}),
  ods_background:  intFromInput({max: question17Length})  
});