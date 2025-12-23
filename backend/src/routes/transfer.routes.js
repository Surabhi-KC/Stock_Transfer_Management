import express from 'express';
import {
  createTransfer,
  updateTransferStatus,
  getTransfers
} from '../controllers/transfer.controller.js';

const router = express.Router();

router.post('/', createTransfer);
router.patch('/:id/status', updateTransferStatus);
router.get('/', getTransfers);

export default router;
