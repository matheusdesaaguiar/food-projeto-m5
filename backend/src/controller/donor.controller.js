// 📦 Controller responsável por lidar com as requisições HTTP (Express)
import * as donorService from '../services/donor.service.js';

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

export const getDonorByEmail = async (req, res) => {
  try {
    const donor = await donorService.getDonorById(req.params.email);
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
    const idDonor = req.paramms.id;
    const existingDonor = await donorService.getDonorById(idDonor);

    if (!existingDonor) {
      return res.status(404).json({ message: "Doador não encontrado" });
    } 

    const updatedDonor = await donorService.updateDonor(idDonor, req.body);
    res.status(200).json(updatedDonor);
  } catch (error) {
    console.error("Erro ao atualizar doador:", error);
    res.status(500).json({ message: "Erro ao atualizar doador", error: error.message });
  }
};

// ❌ Deletar doador por ID
export const deleteDonor = async (req, res) => {
  try {
    const idDonor = req.params.id;
    const existingDonor = await donorService.getDonorById(idDonor);
    if (!existingDonor) {
      return res.status(404).json({ message: "Doador não encontrado" });
    }
    await donorService.deleteDonor(req.params.id);
    res.status(204).send(); // Retorna status 204 (Sem conteúdo) após a exclusão
  } catch (error) {
    console.error("Erro ao deletar doador:", error);
    res.status(500).json({ message: "Erro ao deletar doador", error: error.message });
  }
};

export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, phone, address, cnpj } = req.body;

    if (!name || !email || !password || !phone || !address || !cnpj) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 6 caracteres"
      });
    }

    const result = await donorService.registerDonor(req.body);

    res.status(201).json({
      message: "Doador registrado com sucesso",
      donor: result.donor,
      token: result.token
    });
  } catch (error) {
    console.error("Erro ao registrar doador:", error);

    if (error.message === 'E-mail já cadastrado') {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({
      message: "Erro ao registrar doador",
      error: error.message
    });
  }
};

export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios"
      });
    }

    const result = await donorService.loginDonor(email, password);

    res.status(200).json({
      message: "Login realizado com sucesso",
      donor: result.donor,
      token: result.token
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    if (error.message === 'Credenciais inválidas') {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({
      message: "Erro ao fazer login",
      error: error.message
    });
  }
};
