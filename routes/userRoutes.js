import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { getAdminStats } from '../controllers/userController.js';

const router = express.Router();

// @desc Test protected route
// @route GET /api/users/profile
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});
router.get('/admin/stats', protect, admin, getAdminStats);


export default router;
