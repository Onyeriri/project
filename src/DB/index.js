import { Pool } from 'pg';
import helper from '../Utils/helper';

const pool = new Pool({
  connectionString: helper.DB,
});

class Database {
  static async query(query, value, isArray = false) {
    const response = await pool.query(query, value);
    const result = isArray ? response.rows : response.rows[0];
    return result;
  }
}

export default Database;
