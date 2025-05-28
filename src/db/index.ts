import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

// NOTE:"트랜잭션" 풀 모드에서는 사전 페치가 지원되지 않으므로 사전 페치를 비활성화합니다.
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

export default db;
