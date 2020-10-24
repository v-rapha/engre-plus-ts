import express from 'express';
import { EmployeeController } from './controllers/EmployeeController';
import { SaleController } from './controllers/SaleController';
import { WorkController } from './controllers/WorkController';
import { authMiddleware } from './middlewares/auth';

const routes = express.Router();

const worksController = new WorkController();
const salesController = new SaleController();
const employeeController = new EmployeeController();

routes.get('/works', authMiddleware, worksController.getWorksForLoggedUser);

routes.post('/sales', authMiddleware, salesController.create);

routes.post('/employee', employeeController.create);

routes.post('/employee/authenticate', employeeController.authenticate);

export default routes;
