import { Pool } from 'pg';
import 'dotenv/config';

let DB = null;
switch (process.env.NODE_ENV) {
  case 'production':
    DB = process.env.DATABASE_URL;
    break;
  case 'development':
    DB = process.env.DB_CONFIG;
    break;
  default:
    DB = process.env.DB_CONFIG;
    break;
}

const pool = new Pool({
  connectionString: DB,
});

class Database {
  static async query(query, value, isArray = false) {
    const response = await pool.query(query, value);
    const result = isArray ? response.rows : response.rows[0];
    return result;
  }
}

export default Database;
