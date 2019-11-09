import EmployeeModel from '../models/employees';
import JWT from '../middlewares/jsonWebToken';
import bcrypt from 'bcrypt';
import ErrorHandler from '../ErrorHandler/errorhandler';

class EmployeeController {
    static async createEmployee(req, res, next) {
        try {
            const employee = await EmployeeModel.createEmployee(req.body);
            const token = await JWT.generateToken({
                userId: employee.userid,
                email: employee.email,
                isAdmin: employee.jobrole
            })
            const message = 'user account successfully created';
            const data = {
                message,
                token,
                userId: employee.userid
            };
            res.status(201).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async signInEmployee(req, res, next) {
        const {
            email,
            password
        } = req.body;
        try {
            const employee = await EmployeeModel.getUserEmail(email);
            const token = JWT.generateToken({
                isAdmin: employee.jobrole,
                email: employee.email,
                userId: employee.userid
            });
            const isPassword = await bcrypt.compare(password, employee.password);
            if (!isPassword) {
                throw new ErrorHandler('Incorrect password, please review your password and try again', 400)
            }
            const data = {
                userId: employee.userid,
                token
            }
            res.status(200).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error);
        }
    }
}

export default EmployeeController;