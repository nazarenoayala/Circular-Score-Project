import {z} from 'zod'

export const createTestSchema = z.object({
  test_name: z.string()
              .min(2, 'El título debe contener al menos 5 caracteres'),  
  is_public: z.number().int().min(0).max(1),  

})

export const questionSchema = z.object({
    question_text: z.string()
                     .min(10, 'La pregunta debe contener al menos 10 caracteres')
                     .max(1000, 'La pregunta debe contener como máximo 1000 caracteres'), 
  premium: z.number().int().min(0).max(1),
})