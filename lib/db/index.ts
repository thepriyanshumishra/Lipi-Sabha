import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

// Neon serverless HTTP client - blazing fast for Edge & Serverless functions
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
export type Database = typeof db;
