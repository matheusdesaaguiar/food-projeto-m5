// src/app/foods/components/FoodsList.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Food } from '@src/types/foods';
import { FoodFormData } from '@src/lib/foodValidation';
import FoodItem from './FoodItem';
import FoodForm from './FoodForm';
import axios from 'axios';

export default function FoodsList() {
  const { data: session } = useSession();
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const api = axios.create({
  baseURL: "https://food-rescue-kfb4.onrender.com",
})

  // Carregar alimentos
  const loadFoods = async () => {
    try {
      setLoading(true);
      const response = await api.get('/foods');
      setFoods(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  // Criar novo alimento
  const handleCreateFood = async (data: FoodFormData) => {
    try {
      setSubmitting(true);
      const response = await api.post('/foods', data);
      setFoods(prev => [response.data, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Erro ao criar alimento');
    } finally {
      setSubmitting(false);
    }
  };

  // Editar alimento
  const handleEditFood = async (data: FoodFormData) => {
    if (!editingFood) return;

    try {
      setSubmitting(true);
      const response = await api.put(`/foods/${editingFood.id}`, data);
      setFoods(prev => prev.map(food =>
        food.id === editingFood.id ? response.data : food
      ));
      setEditingFood(null);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Erro ao editar alimento');
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar alimento
  const handleDeleteFood = async (foodId: string) => {
    try {
      await api.delete(`/foods/${foodId}`);
      setFoods(prev => prev.filter(food => food.id !== foodId));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Erro ao deletar alimento');
    }
  };

  // Abrir formulário para edição
  const handleEditClick = (food: Food) => {
    setEditingFood(food);
    setShowForm(false);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingFood(null);
  };

  // Cancelar criação
  const handleCancelCreate = () => {
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Alimentos Doados</h1>
          <p className="text-gray-600 mt-2">
            {foods.length} {foods.length === 1 ? 'alimento disponível' : 'alimentos disponíveis'}
          </p>
        </div>
        
        {/* Botão Adicionar - só mostra se estiver logado */}
        {session && (
          <button
            onClick={() => setShowForm(true)}
            disabled={showForm || !!editingFood}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              showForm || editingFood
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            + Adicionar Alimento
          </button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Formulário de criação */}
      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-text-dark mb-4">
            Adicionar Novo Alimento
          </h2>
          <FoodForm
            onSubmit={handleCreateFood}
            onCancel={handleCancelCreate}
          />
        </div>
      )}

      {/* Formulário de edição */}
      {editingFood && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-text-dark mb-4">
            Editar Alimento
          </h2>
          <FoodForm
            onSubmit={handleEditFood}
            initialData={{
              name: editingFood.name,
              category: editingFood.category as FoodFormData['category'],
              expirationDate: editingFood.expirationDate,
            }}
            isEditing={true}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Lista de alimentos */}
      {Array.isArray(foods) && foods.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-dark mb-2">
            Nenhum alimento encontrado
          </h3>
          <p className="text-gray-600">
            {session 
              ? 'Seja o primeiro a doar um alimento!' 
              : 'Faça login para doar alimentos.'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(foods) && foods.map((food) => (
            <FoodItem
              key={food.id}
              food={food}
              onEdit={handleEditClick}
              onDelete={handleDeleteFood}
            />
          ))}
        </div>
      )}
    </div>
  );
}
