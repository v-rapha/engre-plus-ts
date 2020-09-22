import express from 'express';
import { SalesController } from './controllers/sales';
import { WorksController } from './controllers/work';

const routes = express.Router();

const worksController = new WorksController();
const salesController = new SalesController();

routes.get('/works', worksController.getWorksForLoggedUser);

routes.post('/sales', salesController.create);

export default routes;
