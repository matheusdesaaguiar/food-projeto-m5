import { NextRequest, NextResponse } from 'next/server';
import { foodSchema } from '@src/lib/foodValidation'; // Certifique-se de que o caminho está correto
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@src/lib/auth'; // Certifique-se de que o caminho está correto

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
  },
  {
    id: '2',
    name: 'Arroz',
    category: 'Cereais',
    expirationDate: '2024-12-01',
    donatedBy: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com'
    },
    createdAt: '2024-07-10T11:00:00Z',
    updatedAt: '2024-07-10T11:00:00Z'
  }
];

// GET /api/foods - Listar todos os alimentos
export async function GET() {
  try {
    // Ordenar por data de criação (mais recente primeiro)
    const sortedFoods = foods.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedFoods);
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/foods - Criar novo alimento
export async function POST(request: NextRequest) {
  try {
    // Verificar se o usuário está logado
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validar dados com Zod
    const validationResult = foodSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.format()
        },
        { status: 400 }
      );
    }

    // Criar novo alimento
    const newFood = {
      id: Date.now().toString(), // Use UUID em produção
      ...validationResult.data,
      donatedBy: {
        id: Date.now().toString(), // Gera um id único para o doador (ajuste conforme sua lógica)
        name: session.user?.name ?? 'Usuário desconhecido',
        email: session.user?.email ?? 'Email desconhecido'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    foods.push(newFood);

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar alimento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}