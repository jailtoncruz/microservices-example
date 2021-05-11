import { Router, Request, Response } from 'express';
import LoggerController from './controllers/LoggerController';

const loggerController = new LoggerController();
const routes = Router();

routes.get("/", loggerController.index)
routes.post("/", loggerController.write)

export default routes;