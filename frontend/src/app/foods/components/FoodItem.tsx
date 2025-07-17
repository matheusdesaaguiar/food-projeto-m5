// src/app/foods/components/FoodItem.tsx

'use client';

import { Food } from '@src/types/foods';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FoodItemProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (foodId: string) => void;
}

export default function FoodItem({ food, onEdit, onDelete }: FoodItemProps) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  
  const isOwner = (session?.user as { id?: string })?.id === food.donatedBy?.id;

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este alimento?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(food.id);
    } catch (error) {
      console.error('Erro ao deletar alimento:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR });
  };

  const getExpirationStatus = () => {
    const today = new Date();
    const expDate = new Date(food.expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', text: 'Vencido', color: 'text-red-600' };
    } else if (diffDays <= 3) {
      return { status: 'expiring', text: `${diffDays} dia(s)`, color: 'text-orange-600' };
    } else {
      return { status: 'fresh', text: `${diffDays} dias`, color: 'text-accent' };
    }
  };

  const expirationInfo = getExpirationStatus();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header com nome e categoria */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text-dark">{food.name}</h3>
          <span className="inline-block bg-accent/20 text-accent px-2 py-1 rounded-full text-sm font-medium mt-1">
            {food.category}
          </span>
        </div>
        
        {/* Botões de ação - só mostra se for o dono */}
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(food)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Deletar"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Informações de validade */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-dark">Validade:</span>
          <span className="font-medium">{formatDate(food.expirationDate)}</span>
          <span className={`font-medium ${expirationInfo.color}`}>
            ({expirationInfo.text})
          </span>
        </div>
      </div>

      {/* Informações do doador */}
      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">Doado por:</span> {food.donatedBy?.name || 'Anônimo'}
          </div>
          <div>
            {formatDateTime(food.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}