import * as donorService from "../services/donor.service.js";

// 🧪 Mock do Prisma Client
jest.mock("@prisma/client", () => {
  const mockDonor = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => ({
      donor: mockDonor,
    })),
  };
});

describe("📦 Donor Service", () => {
  const mockData = {
    id: 1,
    name: "Empresa X",
    email: "empresa@example.com",
    phone: "1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 🆕 Teste de criação de doador
  it("🆕 deve criar um novo doador", async () => {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    prisma.donor.create.mockResolvedValue(mockData);

    const result = await donorService.createDonor(mockData);
    expect(result).toEqual(mockData);
    expect(prisma.donor.create).toHaveBeenCalledWith({ data: mockData });
  });

  // 📋 Teste para listar todos os doadores
  it("📋 deve retornar todos os doadores", async () => {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    prisma.donor.findMany.mockResolvedValue([mockData]);

    const result = await donorService.getAllDonors();
    expect(result).toEqual([mockData]);
    expect(prisma.donor.findMany).toHaveBeenCalled();
  });

  // 🔍 Teste para buscar doador por ID
  it("🔍 deve retornar um doador por ID", async () => {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    prisma.donor.findUnique.mockResolvedValue(mockData);

    const result = await donorService.getDonorById("1");
    expect(result).toEqual(mockData);
    expect(prisma.donor.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  // 🔄 Teste de atualização de doador
  it("🔄 deve atualizar um doador por ID", async () => {
    const updatedData = { ...mockData, name: "Empresa Y" };
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    prisma.donor.update.mockResolvedValue(updatedData);

    const result = await donorService.updateDonor("1", { name: "Empresa Y" });
    expect(result.name).toBe("Empresa Y");
    expect(prisma.donor.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: expect.objectContaining({ name: "Empresa Y" }),
    });
  });

  // ❌ Teste de exclusão de doador
  it("❌ deve deletar um doador por ID", async () => {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    prisma.donor.delete.mockResolvedValue(mockData);

    const result = await donorService.deleteDonor("1");
    expect(result).toEqual(mockData);
    expect(prisma.donor.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
