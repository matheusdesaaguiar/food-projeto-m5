// src/routes/collectionPointRoutes.js
import express from 'express';
import pointsController from '../controller/collectionPoints.controller.js'

const router = express.Router();

router.get('/', pointsController.getAll);
router.post('/', pointsController.create);
router.patch('/:id', pointsController.update);
router.delete('/:id', pointsController.remove);

export default router;