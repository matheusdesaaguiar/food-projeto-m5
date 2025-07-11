// 📦 Controller responsável por lidar com as requisições HTTP (Express)
import * as donorService from '../services/donor.service.js';

// 🆕 Criar novo doador
export const createDonor = async (req, res) => {
  try {
    // Extraímos os dados da requisição "body"
    const newDonor = await donorService.createDonor(req.body);
    res.status(201).json(newDonor);
  } catch (error) {
    console.error("Erro ao criar doador:", error);
    res.status(500).json({ message: "Erro ao criar doador", error: error.message });
  }
};

// 📋 Listar todos os doadores
export const getAllDonors = async (req, res) => {
  try {
    const donors = await donorService.getAllDonors();
    res.status(200).json(donors);
  } catch (error) {
    console.error("Erro ao listar doadores:", error);
    res.status(500).json({ message: "Erro ao listar doadores", error: error.message });
  }
};

// 🔍 Buscar um doador por ID
export const getDonorById = async (req, res) => {
  try {
    const donor = await donorService.getDonorById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Doador não encontrado" });
    }
    res.status(200).json(donor);
  } catch (error) {
    console.error("Erro ao buscar doador:", error);
    res.status(500).json({ message: "Erro ao buscar doador", error: error.message });
  }
};

// 🔄 Atualizar doador por ID
export const updateDonor = async (req, res) => {
  try {
    const updatedDonor = await donorService.updateDonor(req.params.id, req.body);
    res.status(200).json(updatedDonor);
  } catch (error) {
    console.error("Erro ao atualizar doador:", error);
    res.status(500).json({ message: "Erro ao atualizar doador", error: error.message });
  }
};

// ❌ Deletar doador por ID
export const deleteDonor = async (req, res) => {
  try {
    await donorService.deleteDonor(req.params.id);
    res.status(204).send(); // Retorna status 204 (Sem conteúdo) após a exclusão
  } catch (error) {
    console.error("Erro ao deletar doador:", error);
    res.status(500).json({ message: "Erro ao deletar doador", error: error.message });
  }
};