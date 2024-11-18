import './mockDb';
import request from 'supertest';
import app from '../../app';
import { migrate } from 'drizzle-orm/pglite/migrator';
import { db, client } from '../../db';

beforeAll(async () => {
  await migrate(db, { migrationsFolder: './migrations/' });
});

afterEach(async () => {
  await client.query('DELETE FROM posts');
  await client.query('DELETE FROM users');
});

afterAll(async () => {
  await client.close();
});

describe('Posts Controller', () => {
  describe('GET /posts', () => {
    it('should return an empty list of posts', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual([]);
    });
    it('should return a list of posts', async () => {
      const newUser = { name: 'John Doe', email: 'john@doe.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);
      const newPost = { title: 'Post Title', content: 'Post content', user_id: userResponse.body.id };
      const postResponse = await request(app).post('/api/posts').send(newPost);
      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toMatchObject(newPost);
    });
  });

  describe('GET /posts/:postId', () => {
    it('should return a post based on the provided postId', async () => {
      const newUser = { name: 'John Doe', email: 'john@doe.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);
      
      const newPost = { title: 'Post Title', content: 'Post content', user_id: userResponse.body.id };
      const postResponse = await request(app).post('/api/posts').send(newPost);

      const response = await request(app).get(`/api/posts/${postResponse.body.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(newPost);
    });

    it('should return a 404 if post does not exist', async () => {
      const response = await request(app).get('/api/posts/99999');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /posts', () => {
    it('should create a new post and return it', async () => {
      const newUser = { name: 'Jane Doe', email: 'jane@doe.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);

      const newPost = { title: 'New Post', content: 'New post content', user_id: userResponse.body.id };
      const response = await request(app).post('/api/posts').send(newPost);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newPost);
    });

    it('should return a 400 error if the user_id does not exist', async () => {
      const newPost = { title: 'Invalid Post', content: 'Invalid post content', user_id: 9999 }; // Invalid user_id
      const response = await request(app).post('/api/posts').send(newPost);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('PUT /posts/:postId', () => {
    it('should update an existing post and return the updated post', async () => {
      const newUser = { name: 'Emily Smith', email: 'emily@smith.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);

      const newPost = { title: 'Original Title', content: 'Original content', user_id: userResponse.body.id };
      const postResponse = await request(app).post('/api/posts').send(newPost);

      const updatedPost = { title: 'Updated Title', content: 'Updated content', user_id: userResponse.body.id };
      const response = await request(app).put(`/api/posts/${postResponse.body.id}`).send(updatedPost);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedPost);
    });

    it('should return a 404 if postId does not exist', async () => {
      const updatedPost = { title: 'Updated Title', content: 'Updated content', user_id: 1 };
      const response = await request(app).put('/api/posts/99999').send(updatedPost);
      expect(response.status).toBe(404);
    });

    it('should return a 400 if user_id does not exist when updating post', async () => {
      const newUser = { name: 'John Smith', email: 'john.smith@example.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);

      const newPost = { title: 'Post Title', content: 'Content', user_id: userResponse.body.id };
      const postResponse = await request(app).post('/api/posts').send(newPost);

      const updatedPost = { title: 'New Title', content: 'New content', user_id: 9999 }; // Invalid user_id
      const response = await request(app).put(`/api/posts/${postResponse.body.id}`).send(updatedPost);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('BadRequestError');
    });
  });

  describe('DELETE /posts/:postId', () => {
    it('should delete an existing post and return a success message', async () => {
      const newUser = { name: 'Jack Doe', email: 'jack@doe.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);

      const newPost = { title: 'Post to Delete', content: 'Delete this post', user_id: userResponse.body.id };
      const postResponse = await request(app).post('/api/posts').send(newPost);

      const response = await request(app).delete(`/api/posts/${postResponse.body.id}`);
      expect(response.status).toBe(204);
    });

    it('should return a 404 if postId does not exist when deleting', async () => {
      const response = await request(app).delete('/api/posts/99999');
      expect(response.status).toBe(404);
    });
  });
});
