import express from 'express';
import foodController from '../controller/food.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticateToken, foodController.createFood);
router.put('/update/:id', authenticateToken, foodController.updateFood);
router.delete('/delete/:id', authenticateToken, foodController.deleteFood);

// Rotas públicas (beneficiários podem acessar)
router.get('/all', foodController.getAllFoods);
router.get('/byid/:id', foodController.getFoodById);
router.get('/category/:id', foodController.getFoodByCategory);

export default router;
