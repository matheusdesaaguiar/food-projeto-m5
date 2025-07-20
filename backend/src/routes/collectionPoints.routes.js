// src/routes/collectionPointRoutes.js
import express from 'express';
import pointsController from '../controller/collectionPoints.controller.js'
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', pointsController.getAll);
router.get('/:id', pointsController.getById);
router.post('/create', authenticateToken, pointsController.create);
router.put('/:id', authenticateToken, pointsController.update);
router.delete('/:id', pointsController.remove);

export default router;