import express from 'express';
import impactController from '../controller/impact.controller.js';

const router = express.Router();

router.post('/reports', impactController.createReport);
router.get('/reports/:id', impactController.getReportById);
router.put('/reports/:id', impactController.updateReport);
router.delete('/reports/:id', impactController.deleteReport);
router.get('/global', impactController.getGlobalImpact);
router.post('/calculate', impactController.calculateEquivalence);

export default router;
