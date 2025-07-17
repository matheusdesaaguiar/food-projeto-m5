// src/types/food.ts

export interface Food {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
  donatedBy?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateFoodDto {
  name: string;
  category: string;
  expirationDate: string;
}

export interface UpdateFoodDto {
  name?: string;
  category?: string;
  expirationDate?: string;
}

export interface FoodFormData {
  name: string;
  category: string;
  expirationDate: string;
}

export const FOOD_CATEGORIES = [
  'Frutas',
  'Verduras',
  'Legumes',
  'Carnes',
  'Laticínios',
  'Cereais',
  'Enlatados',
  'Bebidas',
  'Outros'
] as const;

export type FoodCategory = typeof FOOD_CATEGORIES[number];