import express from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  registerDonor,
  loginDonor
} from '../controller/donor.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerDonor);
router.post('/login', loginDonor);

router.post('/', createDonor);

router.get('/', authenticateToken, getAllDonors);

router.get('/:id', authenticateToken, getDonorById);

router.put('/:id', authenticateToken, updateDonor);

router.delete('/:id', authenticateToken, deleteDonor);

export default router;
