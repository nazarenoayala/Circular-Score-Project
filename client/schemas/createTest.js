import {z} from 'zod'

export const createTestSchema = z.object({
  test_name: z.string()
              .min(2, 'El título debe contener al menos 5 caracteres'),  
  category:  z.string()
            .min(3, 'La categoría debe contener al menos 3 caracteres'),
    questions: z.array(
        z.object({
            question_text: z.string()
                     .min(10, 'La pregunta debe contener al menos 10 caracteres')
                     .max(1000, 'La pregunta debe contener como máximo 1000 caracteres'), 
            premium: z.boolean()
        })
    ).min((1, 'Debe de haber al menos una pregunta'))
})