'use client';

import { FoodFormValues } from "@src/app/schemas/food.schema";
import { useState } from "react";
import { useApi } from "./use-api";


// Definindo o tipo Food baseado no seu modelo Prisma
interface Food {
  id: string;
  name: string;
  validity: string | Date;
  quantity: number;
  category: 'NON_PERISHABLE' | 'PERISHABLE' | 'BAKERY' | 'BEVERAGE' | 'DESSERT' | 'READY_TO_EAT' | 'SPECIAL_DIET';
  description?: string;
  collectionPointsId: string;
  donorId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const useFood = () => {
  const { request } = useApi();
  const [foods, setFoods] = useState<Food[]>([]); // Substituindo 'any' por tipo adequado
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const data = await request<Food[]>('get', '/foods'); // Adicionando tipo genérico
      setFoods(data || []);
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (values: FoodFormValues): Promise<boolean> => {
    const response = await request<Food>('post', '/foods', values); // Adicionando tipo genérico
    if (response) {
      setFoods(prev => [...prev, response]);
      return true;
    }
    return false;
  };

  return { foods, loading, fetchFoods, addFood };
};