import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/node-postgres';

let client: PGlite;
const db = drizzle(process.env.DATABASE_URL!);

export { db, client };
