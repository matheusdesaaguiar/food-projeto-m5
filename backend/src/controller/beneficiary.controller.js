// src/controller/beneficiaryController.js

import * as BeneficiaryService from '../services/beneficiary.service.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBeneficiary = async (req, res) => {
  try {
    const newBeneficiary = await BeneficiaryService.createBeneficiary(req.body, prisma);
    res.status(201).json(newBeneficiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBeneficiaries = async (req, res) => {
  try {
    const list = await BeneficiaryService.getAllBeneficiaries(prisma);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBeneficiaryById = async (req, res) => {
  try {
    const beneficiary = await BeneficiaryService.getBeneficiaryById(Number(req.params.id), prisma);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiário não encontrado' });
    }
    res.status(200).json(beneficiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBeneficiary = async (req, res) => {
  try {
    const updated = await BeneficiaryService.updateBeneficiary(Number(req.params.id), req.body, prisma);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBeneficiary = async (req, res) => {
  try {
    await BeneficiaryService.deleteBeneficiary(Number(req.params.id), prisma);
    res.status(200).json({ message: 'Beneficiário deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyBeneficiary = async (req, res) => {
  try {
    const { cpf } = req.body;
    if (!cpf) {
      return res.status(400).json({ error: 'CPF é obrigatório.' });
    }

    const existing = await prisma.beneficiary.findFirst({ where: { cpf } });
    res.status(200).json({ exists: !!existing, id: existing?.id || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
  verifyBeneficiary
};
