import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get all users in JSON format.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.post('/', createUser);
router.get('/', getUsers);

// Add other routes like GET /users/:id, PUT /users/:id, DELETE /users/:id

export default router;
