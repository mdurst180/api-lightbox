import { Router } from 'express';

const router = Router();

// Example post routes
router.get('/', (req, res) => {
  res.send('Get all posts');
});

router.post('/', (req, res) => {
  res.send('Create a new post');
});

// Add other routes like GET /posts/:id, PUT /posts/:id, DELETE /posts/:id

export default router;
