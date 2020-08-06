import fs from "fs";
import { Pool } from "pg";
import logger from "@/common/logger";

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  ssl: isProduction,
});

const initDataBaseQuery = fs.readFileSync(`${__dirname}/init.sql`).toString();

pool.query(initDataBaseQuery).catch((e) => {
  if (e.code !== "23505") logger.error(e);
});

logger.info("Postgres initialized\n");

export default pool;
