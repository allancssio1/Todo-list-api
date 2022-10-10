import { Router } from 'express';
import { UserController } from '../controllers/User';

const userController = new UserController();

const routes = Router();

routes.post('/newUser', userController.create);
routes.post('/editUser/:id', userController.edit);
routes.delete('/delete/:id', userController.delete);

export { routes };
