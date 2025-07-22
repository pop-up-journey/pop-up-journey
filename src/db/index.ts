import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
  db?: ReturnType<typeof drizzle>;
};

const client =
  globalForDb.postgresClient ??
  postgres(connectionString, {
    prepare: false,
    max: 10, // Supabase 기본 Pool Size는 15이므로 적절히 낮게 유지
  });

const db = globalForDb.db ?? drizzle(client);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.postgresClient = client;
  globalForDb.db = db;
}

export default db;
