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

pool
  .query(
    `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(50) NOT NULL UNIQUE
      );

      INSERT INTO users (email, phone)
      VALUES ('admin@email.com', '380673180093');
  `
  )
  .catch((e) => {
    if (e.code !== "23505") logger.error(e);
  });

logger.info("Postgres initialized\n");

export default pool;
