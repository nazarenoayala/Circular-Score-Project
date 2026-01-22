import { z } from "zod";

// Solo letras (incluye acentos y espacios)
const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

// Teléfono válido (números y + opcional)
const phoneRegex = /^\+?\d+$/;

export const editSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .regex(onlyLettersRegex, "El nombre solo puede contener letras"),
  last_name: z
    .string()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .regex(onlyLettersRegex, "El apellido solo puede contener letras"),

  phone_number: z
    .string()
    .min(9, "El teléfono debe tener al menos 9 caracteres")
    .max(20, "El teléfono no puede tener más de 20 caracteres")
    .regex(phoneRegex, "El teléfono solo puede contener números y +"),

  city_id: z
    .coerce
    .number({
      invalid_type_error: "Seleccione una ciudad",
    })
    .int("La ciudad es inválida")
    .positive("Seleccione una ciudad válida")
    .max(9, "La ciudad es inválida")
    .refine(val => val > 0, {
      message: "Debe seleccionar una ciudad",
    }),

  province_id: z
    .coerce
    .number({
      invalid_type_error: "Seleccione una provincia",
    })
    .int("La provincia es inválida")
    .positive("Seleccione una provincia válida")
    .max(9, "La provincia es inválida")
    .refine(val => val > 0, {
      message: "Debe seleccionar una provincia",
    }),
});
