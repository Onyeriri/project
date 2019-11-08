import bcrypt from 'bcrypt';
import Database from '../DB';

class EmployeeModel {
    static async createEmployee({
        firstname,
        lastname,
        password,
        email,
        address,
        department,
        jobrole,
        gender
    }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [email, firstname, lastname, department, gender, jobrole, address, hashedPassword];
        const response = await Database.query('INSERT INTO employees (email, firstname, lastname, department, gender, jobrole, address, password) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', values).catch((error) => console.log('error', error));
        return response;
    }
}

export default EmployeeModel;