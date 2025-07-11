import impactService from '../services/impact.service.js';

const createReport = async (req, res) => {
  try {
    const report = await impactService.createReport(req.body);
    res.status(201).json({message: 'Relatório criado com sucesso', report});
  } catch (error) {
    res.status(500).json({message: 'Erro ao criar o relatório', error: error.message});
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await impactService.getReportById(Number(req.params.id));
    res.json(report);
  } catch (error) {
    res.status(500).json({message: 'Erro ao buscar o relatório', error: error.message});
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await impactService.updateReport(Number(req.params.id), req.body);
    res.json(report);
  } catch (error) {
    res.status(500).json({message: 'Erro ao atualizar o relatório', error: error.message});
  }
};

const deleteReport = async (req, res) => {
  try {
    await impactService.deleteReport(Number(req.params.id));
    res.status(204).json({message: 'Relatório deletado com sucesso'});
  } catch (error) {
    res.status(500).json({message: 'Erro ao deletar o relatório', error: error.message});
  }
};

const getGlobalImpact = async (req, res) => {
  try {
    const total = await impactService.getGlobalImpact();
    res.json({message: 'Impacto global calculado com sucesso', totalSavedFoodKg: total});
  } catch (error) {
    res.status(500).json({message: 'Erro ao buscar o impacto global', error: error.message});
  }
};

const calculateEquivalence = async (req, res) => {
  try {
    const result = await impactService.calculeteEquivalence(req.body.savedFoodKg);
    res.json(result);
  } catch (error) {
    res.status(500).json({message: 'Erro ao calcular a equivalência', error: error.message});
  }
};

export default {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getGlobalImpact,
  calculateEquivalence,
};