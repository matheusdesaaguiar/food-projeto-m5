import express from 'express';
import impactController from '../controller/impact.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rotas que requerem autenticação de doador
router.post('/reports', authenticateToken, impactController.createReport);
router.put('/reports/:id', authenticateToken, impactController.updateReport);
router.delete('/reports/:id', authenticateToken, impactController.deleteReport);

// Rotas públicas (visualização de impacto)
router.get('/reports/:id', impactController.getReportById);
router.get('/global', impactController.getGlobalImpact);
router.post('/calculate', impactController.calculateEquivalence);

export default router;
