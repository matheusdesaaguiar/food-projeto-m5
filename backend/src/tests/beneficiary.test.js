// src/tests/beneficiary.test.js

import * as beneficiaryService from '../services/beneficiary.services.js';

const mockCreate = jest.fn();
const mockFindMany = jest.fn();
const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

const mockPrisma = {
  beneficiary: {
    create: mockCreate,
    findMany: mockFindMany,
    findUnique: mockFindUnique,
    update: mockUpdate,
    delete: mockDelete,
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Beneficiary Service', () => {
  it('deve criar um beneficiário', async () => {
    const newData = {
      name: 'Ana',
      email: 'ana@email.com',
      phone: '11999999999',
      address: 'Rua A',
      cpf: '12345678900',
    };

    const mockCreated = { id: 1, ...newData, createdAt: new Date(), updatedAt: new Date() };
    mockCreate.mockResolvedValue(mockCreated);

    const result = await beneficiaryService.createBeneficiary(newData, mockPrisma);

    expect(result).toEqual(mockCreated);
    expect(mockCreate).toHaveBeenCalledWith({ data: newData });
  });

  it('deve retornar todos os beneficiários', async () => {
    const mockList = [{ id: 1, name: 'João' }, { id: 2, name: 'Maria' }];
    mockFindMany.mockResolvedValue(mockList);

    const result = await beneficiaryService.getAllBeneficiaries(mockPrisma);

    expect(result).toEqual(mockList);
    expect(mockFindMany).toHaveBeenCalled();
  });

  it('deve buscar um beneficiário por ID', async () => {
    const mockOne = { id: 1, name: 'João' };
    mockFindUnique.mockResolvedValue(mockOne);

    const result = await beneficiaryService.getBeneficiaryById(1, mockPrisma);

    expect(result).toEqual(mockOne);
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve atualizar um beneficiário', async () => {
    const data = { name: 'João Atualizado' };
    const mockUpdated = { id: 1, ...data };
    mockUpdate.mockResolvedValue(mockUpdated);

    const result = await beneficiaryService.updateBeneficiary(1, data, mockPrisma);

    expect(result).toEqual(mockUpdated);
    expect(mockUpdate).toHaveBeenCalledWith({ where: { id: 1 }, data });
  });

  it('deve deletar um beneficiário', async () => {
    const mockDeleted = { id: 1 };
    mockDelete.mockResolvedValue(mockDeleted);

    const result = await beneficiaryService.deleteBeneficiary(1, mockPrisma);

    expect(result).toEqual(mockDeleted);
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
