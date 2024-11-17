// Mock the db module
jest.mock('../db', () => {
  const { drizzle } = require('drizzle-orm/pglite');
  const { PGlite } = require('@electric-sql/pglite');

  return {
    db: drizzle(new PGlite()), // Directly return the mocked db
  };
});

import request from 'supertest';
import app from '../app';  // Import the Express app
import { migrate } from 'drizzle-orm/pglite/migrator';
import { db } from '../db';

// Setup schema before tests
beforeAll(async () => {
  await migrate(db, { migrationsFolder: './migrations/' });
});

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return it', async () => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };

      const response = await request(app).post('/api/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User added successfully');
    });

    it('should return list of users with the new user added', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
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
});
