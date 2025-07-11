import express from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from '../controller/donor.controller.js';

const router = express.Router();

// 🆕 Criar doador
router.post('/', createDonor);

// 📄 Listar todos
router.get('/', getAllDonors);

// 🔎 Buscar por ID
router.get('/:id', getDonorById);

// ✏️ Atualizar por ID
router.put('/:id', updateDonor);

// ❌ Deletar por ID
router.delete('/:id', deleteDonor);

export default router;
