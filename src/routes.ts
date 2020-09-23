import express from 'express';
import { SaleController } from './controllers/SaleController';
import { WorkController } from './controllers/WorkController';

const routes = express.Router();

const worksController = new WorkController();
const salesController = new SaleController();

routes.get('/works', worksController.getWorksForLoggedUser);

routes.post('/sales', salesController.create);

export default routes;
