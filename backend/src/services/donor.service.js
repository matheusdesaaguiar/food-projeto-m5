// 📦 Service responsável pela lógica de negócios dos doadores
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 🆕 Criar um novo doador
export const createDonor = async (data) => {
  return await prisma.donor.create({ data });
};

// 📋 Buscar todos os doadores no banco de dados
export const getAllDonors = async () => {
  return await prisma.donor.findMany();
};

// 🔍 Buscar um doador específico pelo ID
export const getDonorById = async (id) => {
  return await prisma.donor.findUnique({
    where: { id: parseInt(id) }, // garante que o ID seja número
  });
};

// 🔄 Atualizar dados de um doador específico
export const updateDonor = async (id, data) => {
  return await prisma.donor.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

// ❌ Deletar um doador pelo ID
export const deleteDonor = async (id) => {
  return await prisma.donor.delete({
    where: { id: parseInt(id) },
  });
};