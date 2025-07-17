// src/app/foods/components/FoodForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { foodSchema, FoodFormData } from '@src/lib/foodValidation'; // Certifique-se de que o caminho está correto
import { FOOD_CATEGORIES } from '@src/types/foods';
import { useState } from 'react';

interface FoodFormProps {
  onSubmit: (data: FoodFormData) => Promise<void>;
  initialData?: Partial<FoodFormData>;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function FoodForm({ 
  onSubmit, 
  initialData, 
  isEditing = false,
  onCancel 
}: FoodFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: initialData || {
      name: '',
      category: undefined,
      expirationDate: ''
    }
  });

  const handleFormSubmit = async (data: FoodFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!isEditing) {
        reset();
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Nome do Alimento */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">
          Nome do Alimento *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.name 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-primary'
          }`}
          placeholder="Ex: Maçãs, Arroz, Leite..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-text-dark mb-1">
          Categoria *
        </label>
        <select
          id="category"
          {...register('category')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.category 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-primary'
          }`}
        >
          <option value="">Selecione uma categoria</option>
          {FOOD_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Data de Validade */}
      <div>
        <label htmlFor="expirationDate" className="block text-sm font-medium text-text-dark mb-1">
          Data de Validade *
        </label>
        <input
          id="expirationDate"
          type="date"
          {...register('expirationDate')}
          min={new Date().toISOString().split('T')[0]}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.expirationDate 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-primary'
          }`}
        />
        {errors.expirationDate && (
          <p className="mt-1 text-sm text-red-600">{errors.expirationDate.message}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
        >
          {isSubmitting ? 'Enviando...' : isEditing ? 'Atualizar' : 'Doar Alimento'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-text-dark hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}