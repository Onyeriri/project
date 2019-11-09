import {
    Router
} from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();

router.post('/auth/create-user', EmployeeController.createEmployee);
router.post('/auth/signin', EmployeeController.signInEmployee);

export default router;