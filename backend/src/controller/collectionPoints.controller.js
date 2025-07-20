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

getById = async (req, res) => {
    try {
        const id = req.params.id;
        const point = await service.getById(id);
        if (!point) {
            return res.status(404).json({ message: 'Ponto de coleta não encontrado.' });
        }   
        res.json(point);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ponto de coleta', error: error.message });
    }
};

// POST/collection-points → Criar novo ponto de coleta
const create = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        if (!name || !address || !phone) {
            return res.status(400).json({ message: 'Nome, endereço e telefone são obrigatórios.' });
        }
        const novoPonto = await service.create({
            name,
            address,
            phone,});
        res.status(201).json({ message: 'Ponto criado com sucesso', collectionPoint: novoPonto });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ponto', error: error.message });
    }
};

// PATCH/collection-points/:id → Atualizar info (ex: capacidade, endereço)
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const {...data } = req.body;
        if (!data.name && !data.address && !data.phone) {
            return res.status(400).json({ message: 'Pelo menos um campo deve ser atualizado.' });
        }
        const atualizado = await service.update(id, data);
        res.json({ message: 'Ponto atualizado', collectionPoint: atualizado });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ponto', error: error.message });
    }
};

// DELETE/collection-points/:id → Deletar
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'ID do ponto de coleta é obrigatório.' });
    }
    const pontoExistente = await service.getById(id);

    if(!pontoExistente) {
      return res.status(404).json({ message: 'Ponto de coleta não encontrado.' });
    }

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


