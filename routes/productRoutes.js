import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/* PUBLIC */
router.get('/', getProducts);

/* ADMIN (MUST COME BEFORE :id) */
router.get('/admin', protect, admin, getAdminProducts);

router.get('/:id', getProductById);

/* ADMIN */
router.post('/', protect, admin, upload.single('image'), createProduct);

router.put('/:id', protect, admin, upload.single('image'), updateProduct);

router.delete('/:id', protect, admin, deleteProduct);

export default router;
