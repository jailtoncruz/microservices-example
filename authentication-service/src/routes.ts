import { Router } from 'express';
import UserController from './controllers/UserControllers';

const userController = new UserController();
const routes = Router();

routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.post("/users", userController.create);
routes.delete("/users", userController.destroy);
routes.get("/me", userController.me);

export default routes;