import { Router } from 'express';
import { TodosController } from '../controllers/Todos';
import { UserController } from '../controllers/User';

const userController = new UserController();
const todosController = new TodosController();

const routes = Router();

routes.post('/create', userController.create);
routes.post('/editUser/:id', userController.update);
routes.delete('/delete/:id', userController.delete);

routes.get('/todos/:id', todosController.list);

export { routes };
