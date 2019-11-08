import {
    Pool
} from 'pg';
import 'dotenv/config'

const pool = new Pool({
    connectionString: process.env.DB_CONFIG,
})

class Database {
    static async query(query, value, isArray = false) {
        const response = await pool.query(query, value);
        const result = isArray ? response.rows : response.rows[0]
        return result;
    }
}

export default Database;