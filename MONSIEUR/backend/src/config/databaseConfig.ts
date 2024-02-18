import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Set all database information
const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST } =
  process.env;

// Connect to database
const database = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
});

export default database;
