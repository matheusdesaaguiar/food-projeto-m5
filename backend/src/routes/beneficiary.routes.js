import express from 'express';
import beneficiaryController from '../controller/beneficiary.controller.js';

const router = express.Router();

router.post('/verify', beneficiaryController.verifyBeneficiary);
router.post('/', beneficiaryController.createBeneficiary);
router.put('/:id', beneficiaryController.updateBeneficiary);
router.delete('/:id', beneficiaryController.deleteBeneficiary);
router.get('/', beneficiaryController.getAllBeneficiaries);
router.get('/:id', beneficiaryController.getBeneficiaryById);

export default router;
