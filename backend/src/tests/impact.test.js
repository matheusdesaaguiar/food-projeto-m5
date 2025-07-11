import impactService from '../services/impact.service.js';
//chama as funções dos "espiões"
const mockCreate = jest.fn();
const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockAggregate = jest.fn();

const mockPrisma = {
  impactReport: {
    create: mockCreate,
    findUnique: mockFindUnique,
    update: mockUpdate,
    delete: mockDelete,
    aggregate: mockAggregate,
  }
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Impact Service', () => {
//teste para verificar a criação de relatórios
    it('deve criar um relatório', async () => {
        const data = { title: 'Doação', description: 'Descrição', savedFoodKg: 10};
        mockCreate.mockResolvedValue({ id: 1, ...data });

        const result = await impactService.createReport(data, mockPrisma);
        expect(result).toEqual({ id: 1, ...data });
        expect(mockCreate).toHaveBeenCalledWith({ data });
});
//teste para verificar a busca por id
    it('deve buscar um relatório por ID', async () => {
        mockFindUnique.mockResolvedValue({ id:1, title: 'Teste'});
        const result = await impactService.getReportById(1, mockPrisma);
        expect(result).toEqual({ id: 1, title: 'Teste' });
        expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
//teste para atualizar relatório
    it('deve atualizar um relatório', async () => {
        const data = { title: 'Atualizado' };
        mockUpdate.mockResolvedValue({ id: 1, ...data });
        const result = await impactService.updateReport(1, data, mockPrisma);
        expect(result).toEqual({ id: 1, ...data });
        expect(mockUpdate).toHaveBeenCalledWith({ where: { id: 1 }, data });
    });
//teste para Deletar relatório
    it('deve deletar um relatório', async () => {
        mockDelete.mockResolvedValue({ id: 1 });
        const result = await impactService.deleteReport(1, mockPrisma);
        expect(result).toEqual({ id: 1 });
        expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
// teste para Calcular impacto global
    it('deve calcular o total de alimentos salvos', async () => {
    const mockAggregate = jest.fn().mockResolvedValue({
      _sum: { savedFoodKg: 250 }
    });

    const mockPrisma = {
      impactReport: {
        aggregate: mockAggregate
      }
    };

    const result = await impactService.getGlobalImpact(mockPrisma);
    
    expect(result).toBe(250);
    expect(mockAggregate).toHaveBeenCalledWith({
      _sum: { savedFoodKg: true }
    });
    });

// teste para Calcular equivalência
    it('deve calcular a equivalência em água e CO2', () => {
        const result = impactService.calculateEquivalence(10);
        expect(result).toEqual({
            savedFoodKg: 10,
            waterLiters: 10000,
            co2Kg: 10
        });
    });
    // esse vai ser o único teste que vai usar o mock do prisma, vai utilizar apenas os calculos
});

