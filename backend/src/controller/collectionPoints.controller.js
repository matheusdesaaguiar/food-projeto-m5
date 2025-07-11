import service from '../services/collectionPoints.service.js';

// GET/collection-points → Listar todos
const getAll = async (req, res) => {
    try {
        const points = await service.getAll();
        res.json(points);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pontos de coleta', error: error.message });
    }
};

// POST/collection-points → Criar novo ponto de coleta
const create = async (req, res) => {
    try {
        const novoPonto = await service.create(req.body);
        res.status(201).json({ message: 'Ponto criado com sucesso', collectionPoint: novoPonto });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ponto', error: error.message });
    }
};

// PATCH/collection-points/:id → Atualizar info (ex: capacidade, endereço)
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const atualizado = await service.update(id, req.body);
        res.json({ message: 'Ponto atualizado', collectionPoint: atualizado });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ponto', error: error.message });
    }
};

// DELETE/collection-points/:id → Deletar
const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await service.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar ponto', error: error.message });
  }
};


// exportando as funções
export default {
  getAll,
  create,
  update,
  remove,
};


