import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';

// Create and initialize the mock database client and db
const client = new PGlite();
const db = drizzle(client);

// Export the mock db and client
export { db, client };

// Mock the db module for Jest
jest.mock('../../db', () => ({
  db,
  client,
}));
