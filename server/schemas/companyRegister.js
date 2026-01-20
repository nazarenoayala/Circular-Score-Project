import {z} from 'zod';

export const registerCompanySchema = z.object({
  name: z.string()
          .min(2, 'El nombre de empresa debe tener 2 carácteres como mínimo')
          .max(50, 'El nombre de empresa ')
})