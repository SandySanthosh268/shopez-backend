import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { dummyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/dummy', protect, dummyPayment);

export default router;
