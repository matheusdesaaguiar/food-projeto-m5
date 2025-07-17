// src/hooks/useFoods.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Food } from '@/types/food';
import { FoodFormData } from '@/lib/validations';

interface UseFoodsReturn {
  foods: Food[];
  loading: boolean;
  error: string | null;
  createFood: (data: FoodFormData) => Promise<void>;
  updateFood: (id: string, data: Partial<FoodFormData>) => Promise<void>;
  deleteFood: (id: string) => Promise<void>;
  refreshFoods: () => Promise<void>;
}

export function useFoods(): UseFoodsReturn {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar alimentos
  const loadFoods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/foods');
      if (!response.ok) {
        throw new Error('Erro ao carregar alimentos');
      }
      
      const data = await response.json();
      setFoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar novo alimento
  const createFood = useCallback(async (data: FoodFormData) => {
    try {
      setError(null);
      
      const response = await fetch('/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar alimento');
      }

      const newFood = await response.json();
      setFoods(prev => [newFood, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar alimento');
      throw err;
    }
  }, []);

  // Atualizar alimento
  const updateFood = useCallback(async (id: string, data: Partial<FoodFormData>) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/foods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar alimento');
      }

      const updatedFood = await response.json();
      setFoods(prev => prev.map(food => 
        food.id === id ? updatedFood : food
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar alimento');
      throw err;
    }
  }, []);

  // Deletar alimento
  const deleteFood = useCallback(async (id: string) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/foods/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao deletar alimento');
      }

      setFoods(prev => prev.filter(food => food.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar alimento');
      throw err;
    }
  }, []);

  // Recarregar alimentos
  const refreshFoods = useCallback(() => {
    return loadFoods();
  }, [loadFoods]);

  // Carregar alimentos na inicialização
  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return {
    foods,
    loading,
    error,
    createFood,
    updateFood,
    deleteFood,
    refreshFoods,
  };
}