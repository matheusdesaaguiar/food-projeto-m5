// src/routes/collectionPointRoutes.js
import express from 'express';
import {
    getAll, 
    getById,
    create,
    update,
    remove 
} from '../controller/collectionPoints.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', authenticateToken, create);
router.put('/:id', authenticateToken, update);
router.delete('/:id', authenticateToken, remove);

export default router;