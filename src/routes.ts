import express from 'express';
import { EmployeeController } from './controllers/EmployeeController';
import { SaleController } from './controllers/SaleController';
import { WorkController } from './controllers/WorkController';

const routes = express.Router();

const worksController = new WorkController();
const salesController = new SaleController();
const employeeController = new EmployeeController();

routes.get('/works', worksController.getWorksForLoggedUser);

routes.post('/sales', salesController.create);

routes.post('/employee', employeeController.create);

export default routes;
