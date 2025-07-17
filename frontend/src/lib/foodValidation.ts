// src/lib/validations.ts

import { z } from 'zod';
import { FOOD_CATEGORIES } from '@src/types/foods';

export const foodSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  category: z.enum(FOOD_CATEGORIES, {
    message: 'Categoria é obrigatória'
  }),
  
  expirationDate: z.string()
    .min(1, 'Data de validade é obrigatória')
    .refine((date) => {
      const today = new Date();
      const expDate = new Date(date);
      today.setHours(0, 0, 0, 0);
      expDate.setHours(0, 0, 0, 0);
      return expDate >= today;
    }, 'Data de validade deve ser hoje ou futura')
});

export const updateFoodSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),
  
  category: z.enum(FOOD_CATEGORIES).optional(),
  
  expirationDate: z.string()
    .refine((date) => {
      const today = new Date();
      const expDate = new Date(date);
      today.setHours(0, 0, 0, 0);
      expDate.setHours(0, 0, 0, 0);
      return expDate >= today;
    }, 'Data de validade deve ser hoje ou futura')
    .optional()
});

export type FoodFormData = z.infer<typeof foodSchema>;
export type UpdateFoodFormData = z.infer<typeof updateFoodSchema>;