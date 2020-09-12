import express from 'express';
import { WorksController } from './controllers/works';

const routes = express.Router();

const worksController = new WorksController();

routes.get('/works', worksController.getWorksForLoggedUser);

export default routes;