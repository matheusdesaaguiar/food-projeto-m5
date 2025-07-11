import pointsController from '../controller/collectionPoints.controller.js';
import service from '../services/collectionPoints.service.js';

jest.mock('../services/collectionPoints.service.js');


describe('CollectionPoints Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('deve retornar todos os pontos de coleta', async () => {
      const mockPoints = [{ id: 1, name: 'Ponto A' }];
      service.getAll.mockResolvedValue(mockPoints);

      await pointsController.getAll(req, res);

      expect(service.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPoints);
    });

    it('deve retornar erro ao buscar pontos', async () => {
      service.getAll.mockRejectedValue(new Error('Falha'));

      await pointsController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao buscar pontos de coleta',
        error: 'Falha'
      });
    });
  });

  describe('create', () => {
    it('deve criar um novo ponto', async () => {
      const novoPonto = { name: 'Ponto Novo' };
      req.body = novoPonto;
      service.create.mockResolvedValue({ id: 1, ...novoPonto });

      await pointsController.create(req, res);

      expect(service.create).toHaveBeenCalledWith(novoPonto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Ponto criado com sucesso',
        collectionPoint: { id: 1, ...novoPonto }
      });
    });

    it('deve retornar erro ao criar ponto', async () => {
      service.create.mockRejectedValue(new Error('Falha'));

      await pointsController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao criar ponto',
        error: 'Falha'
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um ponto', async () => {
      const atualizacao = { capacidade: 50 };
      req.params.id = '1';
      req.body = atualizacao;

      service.update.mockResolvedValue({ id: 1, ...atualizacao });

      await pointsController.update(req, res);

      expect(service.update).toHaveBeenCalledWith(1, atualizacao);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Ponto atualizado',
        collectionPoint: { id: 1, ...atualizacao }
      });
    });

    it('deve retornar erro ao atualizar ponto', async () => {
      service.update.mockRejectedValue(new Error('Falha'));
      req.params.id = '1';

      await pointsController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao atualizar ponto',
        error: 'Falha'
      });
    });
  });

  describe('remove', () => {
    it('deve remover um ponto', async () => {
      req.params.id = '1';
      service.remove.mockResolvedValue();

      await pointsController.remove(req, res);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('deve retornar erro ao deletar ponto', async () => {
      service.remove.mockRejectedValue(new Error('Falha'));
      req.params.id = '1';

      await pointsController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao deletar ponto',
        error: 'Falha'
      });
    });
  });
});