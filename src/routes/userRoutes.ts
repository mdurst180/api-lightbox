import { Router } from 'express';
import { createUser, getUser, getUsers } from '../controllers/userController';
import { validate } from '../middleware/validation';
import { validateCreateUser, validateGetUser } from '../validators/usersValidation';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', validate(validateCreateUser), createUser);

// Add other routes like GET /users/:id, PUT /users/:id, DELETE /users/:id
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
 *   post:
 *     summary: Create a new user
 *     description: Create a new user by providing their name and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User added successfully
 *       400:
 *         description: Bad request. Validation error if name or email is missing/invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: validation_error
 *                 message:
 *                   type: string
 *                   example: Name is required
 *       500:
 *         description: Internal server error. Unable to add the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: server_error
 *                 message:
 *                   type: string
 *                   example: Unable to add
 */
export default router;
