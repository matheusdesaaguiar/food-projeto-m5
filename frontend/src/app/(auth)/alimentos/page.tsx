// src/app/(auth)/alimentos/page.tsx
'use client'; // Adicione esta diretiva no topo do arquivo

import { FoodCard } from './components/FoodCard';
import { AddFoodModal } from './components/AddFoodModal';
import { RefreshCw } from 'lucide-react';
import { useFood } from '@src/hooks/use-food';
import { Button } from '@src/components/ui/button';

export default function AlimentosPage() {
  const { foods, loading, fetchFoods } = useFood();

  return (
    <div className="min-h-screen p-6 bg-background mt-60">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8  ">
          <h1 className="text-3xl font-bold text-text-dark">Alimentos Disponíveis</h1>
          <div className="flex gap-4   ">
            <Button 
              onClick={fetchFoods} 
              variant="outline" 
              className="border-primary text-primary hover:bg-accent/10  "
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <AddFoodModal />
          </div>
        </div>

        {loading && !foods.length ? (
          <div className="flex justify-center items-center h-64  ">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}