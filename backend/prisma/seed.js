// seed para popular o banco
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {
  // Donors
  const donor1 = await prisma.donor.create({
    data: {
      name: "Sacolão Verde",
      email: "contato@sacolaoverde.com",
      phone: "11988880000",
      address: "Rua das Laranjeiras, 45",
      cnpj: "12345678000190",
    },
  });

  const donor2 = await prisma.donor.create({
    data: {
      name: "Padaria Pão Quente",
      email: "padaria@paoquente.com",
      phone: "11999990000",
      address: "Avenida dos Pães, 101",
      cnpj: "98765432000176",
    },
  });

  // Beneficiaries
  const beneficiary1 = await prisma.beneficiary.create({
    data: {
      name: "João da Silva",
      email: "joao@email.com",
      phone: "11955550000",
      address: "Rua Esperança, 123",
      cpf: "12345678901",
    },
  });

  const beneficiary2 = await prisma.beneficiary.create({
    data: {
      name: "Maria Oliveira",
      email: "maria@email.com",
      phone: "11944440000",
      address: "Rua Solidariedade, 456",
      cpf: "10987654321",
    },
  });

  // Collection Points
  const point1 = await prisma.collectionPoints.create({
    data: {
      name: "Ponto Central",
      address: "Praça Central, 1",
      phone: "11333330000",
      hoursOfOperetion: new Date("2025-07-11T08:00:00Z"),
      beneficiaryId: beneficiary1.id,
    },
  });

  const point2 = await prisma.collectionPoints.create({
    data: {
      name: "Ponto Leste",
      address: "Av. Leste, 88",
      phone: "11333338888",
      hoursOfOperetion: new Date("2025-07-11T09:00:00Z"),
      beneficiaryId: beneficiary2.id,
    },
  });

  // Food donations
  const food1 = await prisma.food.create({
    data: {
      name: "Maçã",
      validity: new Date("2025-07-20"),
      quantity: 20,
      category: "Frutas",
      description: "Maçãs frescas",
      donorId: donor1.id,
      collectionPointsId: point1.id,
    },
  });

  const food2 = await prisma.food.create({
    data: {
      name: "Pão Integral",
      validity: new Date("2025-07-12"),
      quantity: 50,
      category: "Padaria",
      description: "Pães embalados no dia anterior",
      donorId: donor2.id,
      collectionPointsId: point2.id,
    },
  });

  const food3 = await prisma.food.create({
    data: {
      name: "Tomate",
      validity: new Date("2025-07-15"),
      quantity: 15,
      category: "Hortaliças",
      description: "Tomates maduros",
      donorId: donor1.id,
      collectionPointsId: point2.id,
    },
  });

  // Notification Engagements
  await prisma.notificationEngagement.createMany({
    data: [
      {
        beneficiaryId: beneficiary1.id,
        foodId: food1.id,
        NotificationType: "sent",
      },
      {
        beneficiaryId: beneficiary2.id,
        foodId: food3.id,
        NotificationType: "received",
      },
    ],
  });

  // Impact Reports
  await prisma.impactReport.createMany({
    data: [
      {
        donorId: donor1.id,
        title: "Doações de Julho",
        description: "Resumo das doações feitas em julho",
        savedFoodKg: 35.5,
      },
      {
        donorId: donor2.id,
        title: "Relatório Quinzenal",
        description: "Doações de pães e similares",
        savedFoodKg: 12.2,
      },
    ],
  });

  console.log("✅ Seed inserido com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao inserir seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });