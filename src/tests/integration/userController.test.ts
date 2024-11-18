// Mock the db module
jest.mock('../../db', () => {
  const { drizzle } = require('drizzle-orm/pglite');
  const { PGlite } = require('@electric-sql/pglite');

  const client = new PGlite();
  return {
    db: drizzle(client), // Directly return the mocked db
    client
  };
});

import request from 'supertest';
import app from '../../app';  // Import the Express app
import { migrate } from 'drizzle-orm/pglite/migrator';
import { db, client } from '../../db';
import logger from '../../logger';

// Setup schema before tests
beforeAll(async () => {
  await migrate(db, { migrationsFolder: './migrations/' });
});

// Clean up after each test by deleting user rows
afterEach(async () => {
  await client.query('DELETE FROM users'); // Replace 'users' with your actual table name
});

afterAll(async () => {
  // Close the Drizzle connection
  await client.close()
});

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /users/:userId', () => {
    it('should return a user based on an Id', async () => {
      const newUser = { name: 'John Doe', email: 'new@user.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);
      const existingUserResponse = await request(app).get(`/api/users/${userResponse.body.id}`);
      expect(existingUserResponse.status).toBe(200);
      expect(existingUserResponse.body).toMatchObject(newUser);
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return it', async () => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };
      const response = await request(app).post('/api/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newUser);
    });
    
    it('should return validation error if name is missing', async () => {
      const invalidUser = { email: 'john@example.com' };

      const response = await request(app).post('/api/users').send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('validation_error');
    });

    it('should return validation error if email is invalid', async () => {
      const invalidUser = { name: 'John Doe', email: 'invalidemail' };

      const response = await request(app).post('/api/users').send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('validation_error');
    });

  });

  describe('PUT /users/:userId', () => {
    it('should update an existing user', async () => {
      const newUser = { name: 'John Doe', email: 'john2@example.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);
      const updatedUser = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      const response = await request(app)
        .put(`/api/users/${userResponse.body.id}`)
        .send(updatedUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(updatedUser);
    });

    it('should return 404 if userId does not exist', async () => {
      const nonExistentUserId = 999998;
      const updatedUser = { name: 'Jane Doe', email: 'jane.doe@example.com' };

      const response = await request(app)
        .put(`/api/users/${nonExistentUserId}`)
        .send(updatedUser);

      logger.info(`Got response: ${JSON.stringify(response)}`);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should delete an existing user and return a success message', async () => {
      // Create a new user to delete
      const newUser = { name: 'John Doe', email: 'delete@user.com' };
      const userResponse = await request(app).post('/api/users').send(newUser);
  
      // Delete the newly created user
      const response = await request(app).delete(`/api/users/${userResponse.body.id}`);
  
      expect(response.status).toBe(204);
    });
  
    it('should return 404 if the userId does not exist', async () => {
      const nonExistentUserId = 999999; // A userId that does not exist in the database
  
      const response = await request(app).delete(`/api/users/${nonExistentUserId}`);
  
      expect(response.status).toBe(404);
    });
  });
  
});
