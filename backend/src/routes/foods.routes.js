import express from 'express';
import foodController from '../controller/food.controller.js';

const router = express.Router();

router.post('/create', foodController.createFood);
router.get('/all', foodController.getAllFoods);
router.get('/byid/:id', foodController.getFoodById);
router.put('/update/:id', foodController.updateFood);
router.delete('/delete/:id', foodController.deleteFood);
router.get('/category/:id', foodController.getFoodByCategory);

export default router;