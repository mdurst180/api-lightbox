import express from 'express';
import { getPosts, createPost, updatePost, getPost, deletePost } from '../controllers/postsController';
import { validate } from '../middleware/validation';
import { validateCreatePost, validateUpdatePost } from '../validators/postsValidation';
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', validate(validateCreatePost), createPost);
router.put('/:id', validate(validateUpdatePost), updatePost);
router.delete('/:id', deletePost);

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: My First Post
 *         content:
 *           type: string
 *           example: This is the content of my first post.
 *         user_id:
 *           type: integer
 *           description: The ID of the user who created the post.
 *           example: 1
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: User not found or validation error
 *         message:
 *           type: string
 *           example: The user ID provided does not match any existing user.
 * /posts:
 *   get:
 *     summary: Retrieve a list of all posts
 *     description: Get all posts in JSON format.
 *     responses:
 *       200:
 *         description: A list of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the provided title, content, and user_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: My New Post
 *               content:
 *                 type: string
 *                 example: This is the content of my new post.
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who creates the post.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request. The user ID does not match any existing user or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     description: Get a post by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single post object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Update a post by ID
 *     description: Update the post with the given ID with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Post Title
 *               content:
 *                 type: string
 *                 example: Updated content of the post.
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the post.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request. The user ID does not match any existing user or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete the post with the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router;
