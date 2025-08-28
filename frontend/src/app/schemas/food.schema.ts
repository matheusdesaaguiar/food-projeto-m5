// src/app/schemas/food.schema.ts
import { z } from 'zod';

export const FoodCategoryEnum = z.enum([
  'NON_PERISHABLE',
  'PERISHABLE',
  'BAKERY',
  'BEVERAGE',
  'DESSERT',
  'READY_TO_EAT',
  'SPECIAL_DIET'
]);

export const foodSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  validity: z.string().min(1, 'Data de validade é obrigatória'),
  quantity: z.number().min(1, 'Quantidade deve ser pelo menos 1'),
  category: FoodCategoryEnum,
  description: z.string().optional(),
  collectionPointsId: z.string().min(1, 'Ponto de coleta é obrigatório')
});

export type FoodFormValues = z.infer<typeof foodSchema>;