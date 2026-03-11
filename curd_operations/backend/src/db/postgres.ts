import { Pool } from "pg";

export const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Students",
  password: "1234",
  port: 8080,
});

export const connectPostgres = async () => {
  try {
    await pgPool.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed", error);
  }
};