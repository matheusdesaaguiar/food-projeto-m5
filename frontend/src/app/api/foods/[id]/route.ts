// src/app/api/foods/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { updateFoodSchema } from '@/lib/validations';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Mock database - substitua pela sua implementação real
let foods = [
  {
    id: '1',
    name: 'Maçãs',
    category: 'Frutas',
    expirationDate: '2024-08-15',
    donatedBy: {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com'
    },
    createdAt: '2024-07-10T10:00:00Z',
    updatedAt: '2024-07-10T10:00:00Z'
  }
];

// PUT /api/foods/[id] - Atualizar alimento
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();

    // Encontrar o alimento
    const foodIndex = foods.findIndex(food => food.id === id);
    if (foodIndex === -1) {
      return NextResponse.json(
        { error: 'Alimento não encontrado' },
        { status: 404 }
      );
    }

    const food = foods[foodIndex];

    // Verificar se o usuário é o dono do alimento
    if (food.donatedBy.id !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este alimento' },
        { status: 403 }
      );
    }

    // Validar dados
    const validationResult = updateFoodSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.format()
        },
        { status: 400 }
      );
    }

    // Atualizar o alimento
    const updatedFood = {
      ...food,
      ...validationResult.data,
      updatedAt: new Date().toISOString()
    };

    foods[foodIndex] = updatedFood;

    return NextResponse.json(updatedFood);
  } catch (error) {
    console.error('Erro ao atualizar alimento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/foods/[id] - Deletar alimento
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Encontrar o alimento
    const foodIndex = foods.findIndex(food => food.id === id);
    if (foodIndex === -1) {
      return NextResponse.json(
        { error: 'Alimento não encontrado' },
        { status: 404 }
      );
    }

    const food = foods[foodIndex];

    // Verificar se o usuário é o dono do alimento
    if (food.donatedBy.id !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar este alimento' },
        { status: 403 }
      );
    }

    // Remover o alimento
    foods.splice(foodIndex, 1);

    return NextResponse.json(
      { message: 'Alimento deletado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar alimento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}