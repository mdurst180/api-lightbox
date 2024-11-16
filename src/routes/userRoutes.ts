import { Router } from 'express';

const router = Router();

// Example user routes
router.get('/', (req, res) => {
  res.send('Get all users');
});

router.post('/', (req, res) => {
  res.send('Create a new user');
});

// Add other routes like GET /users/:id, PUT /users/:id, DELETE /users/:id

export default router;
