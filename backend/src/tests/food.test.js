import foodService from '../services/Foods.service.js';

// Mocks das funções do Prisma
const mockFindMany = jest.fn();
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();
const mockDelete = jest.fn();

// Objeto Prisma simulado
const mockPrisma = {
  food: {
    findMany: mockFindMany,
    findUnique: mockFindUnique,
    create: mockCreate,
    delete: mockDelete
  }
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Food Service', () => {
  describe('GET /food/all', () => {
    it('deve retornar todos os alimentos', async () => {
      const mockFoods = [
        { id: 1, name: 'Banana', category: 'Fruit', expirationDate: new Date() },
        { id: 2, name: 'Carrot', category: 'Vegetable', expirationDate: new Date() }
      ];

      mockFindMany.mockResolvedValue(mockFoods);

      const result = await foodService.getAllFoods(mockPrisma);

      expect(result).toEqual(mockFoods);
      expect(mockFindMany).toHaveBeenCalled();
    });
  });

  describe('GET /food/byid/:id', () => {
    it('deve retornar um alimento pelo ID', async () => {
      const mockFood = { id: 1, name: 'Banana', category: 'Fruit', expirationDate: new Date() };

      mockFindUnique.mockResolvedValue(mockFood);

      const result = await foodService.getFoodById(1, mockPrisma);

      expect(result).toEqual(mockFood);
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve retornar null se o alimento não for encontrado', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await foodService.getFoodById(999, mockPrisma);

      expect(result).toBeNull();
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('POST /food/create', () => {
    it('deve criar um alimento', async () => {
      const newFood = {
        name: 'Apple',
        category: 'Fruit',
        expirationDate: '2025-12-01' // string ISO
      };

      const mockCreatedFood = {
        id: 1,
        ...newFood,
        expirationDate: new Date(newFood.expirationDate) // simula retorno do banco com Date
      };

      mockCreate.mockResolvedValue(mockCreatedFood);

      const result = await foodService.createFood(newFood, mockPrisma);

      expect(result.name).toBe(newFood.name);
      expect(result.category).toBe(newFood.category);
      expect(new Date(result.expirationDate)).toEqual(new Date(newFood.expirationDate));

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          ...newFood,
          expirationDate: new Date(newFood.expirationDate) // garantir consistência no input
        }
      });
    });
  });

  describe('DELETE /food/delete/:id', () => {
    it('deve deletar um alimento pelo ID', async () => {
      const mockDeleted = { id: 1 };

      mockDelete.mockResolvedValue(mockDeleted);

      const result = await foodService.deleteFood(1, mockPrisma);

      expect(result).toEqual(mockDeleted);
      expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});