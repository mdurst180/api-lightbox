import { Router } from 'express';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';

const router = Router();

// Define route paths and associate them with imported route handlers
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;