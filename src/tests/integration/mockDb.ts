import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';

const client = new PGlite();
const db = drizzle(client);

export { db, client };

jest.mock('../../db', () => ({
  db,
  client,
}));
