import EmployeeModel from '../models/employees';
import JWT from '../middlewares/jsonWebToken';

class EmployeeController {
    static async createEmployee(req, res, next) {
        try {
            const employee = await EmployeeModel.createEmployee(req.body);
            const token = await JWT.generateToken({
                userId: employee.userid,
                email: employee.email,
                isAdmin: employee.jobrole
            })
            console.log('token', token)
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
}

export default EmployeeController;