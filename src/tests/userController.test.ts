jest.mock('../db', () => {
  const { drizzle } = require('drizzle-orm/pglite');  // Dynamically import drizzle
  const { PGlite } = require('@electric-sql/pglite'); // Dynamically import PGlite

  const mockDb = drizzle(new PGlite()); // Create in-memory mock DB
  return {
    db: mockDb,
  };
});

import request from 'supertest';
import app from '../app';  // Import the Express app from your app.ts
import { migrate } from "drizzle-orm/pglite/migrator"
// import { db } from "./db/dbMem"

import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { db } from '../db';

// Setup the schema before tests
beforeAll(async () => {
  await migrate(db, {
    migrationsFolder: "./migrations/",
  });
});

describe('User Controller', () => {
  // Test for GET /users
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);  // Assuming the response is an array
    });
  });

  // Test for POST /users
  describe('POST /users', () => {
    it('should create a new user and return it', async () => {
      // Mock the insert method to simulate a successful database insertion

      const newUser = { name: 'John Doe', email: 'john@example.com' };

      const response = await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User added successfully');
      expect(response.body).toHaveProperty('message');

    });

    it('should return list of users with the new user added', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);  // Assuming the response is an array
      expect(response.body.length).toBe(1);  // Assuming the response is an array
    });

    it('should return validation error if name is missing', async () => {
      const invalidUser = { email: 'john@example.com' };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Name is required');
    });

    it('should return validation error if email is invalid', async () => {
      const invalidUser = { name: 'John Doe', email: 'invalidemail' };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email is missing or invalid');
    });
  });
});
